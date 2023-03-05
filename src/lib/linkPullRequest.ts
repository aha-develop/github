import { IDENTIFIER, IPullRequestLink } from "extension";
import { PrCommitFragment, PrForLinkFragment } from "generated/graphql";
import { extractReferenceFromName } from "./extractReferenceFromName";
import { appendField } from "./fields";
import { withGitHubApi } from "./github/api";
import {
  githubPullRequestToActionLink,
  githubPullRequestToPrLink,
} from "./github/converters";
import { getPrByUrl } from "./github/getPr";
import { LinkableRecord } from "./linkableRecord";
import { linkActionToRecord } from "./linkAction";
import { updateBranchLinkFromPullRequest } from "./linkBranch";

const PULL_REQUESTS_FIELD = "pullRequests";

export async function linkPullRequest(url: string, record: LinkableRecord) {
  await withGitHubApi(async (api) => {
    const pullRequest = await getPrByUrl(api, url, {
      includeStatus: true,
    });
    if (!pullRequest) {
      throw new Error("Could not find this pull request");
    }

    await updateAllLinksFromPullRequest(pullRequest, record);
  });
}

export async function updateAllLinksFromPullRequest(
  pullRequest: PrForLinkFragment & PrCommitFragment,
  record: LinkableRecord
) {
  const prLink = githubPullRequestToPrLink(pullRequest);
  const actionLink = githubPullRequestToActionLink(pullRequest);

  const promises = [
    updatePullRequestLinkOnRecord(prLink, record),
    updateBranchLinkFromPullRequest(pullRequest, record),
  ];

  console.log({ actionLink });

  if (actionLink) {
    promises.push(linkActionToRecord(record, actionLink));
  }

  await Promise.all(promises);
}

/**
 * Store pull request link against a record
 */
export async function updatePullRequestLinkOnRecord(
  prLink: IPullRequestLink,
  record: LinkableRecord
) {
  console.debug(
    `Updating PR #${prLink.id} on ${record.typename} ${record.referenceNum}`
  );

  await appendField(record, PULL_REQUESTS_FIELD, prLink);
  await aha.account.setExtensionField(
    IDENTIFIER,
    prLink.url,
    record.referenceNum
  );
}

/**
 * Find an Aha! record for a github pull request. The minimal amount of
 * information is required from the PR record, starting with url, html_url,
 * title, headRef: {name} and head: {ref}
 */
export async function getPullRequestRecord(
  pr:
    | {
        url: string;
      }
    | { html_url: string }
    | { title: string }
    | { headRef: { name: string } }
    | { head: { ref: string } }
) {
  // The PR might be a webhook or a GQL object. Handle both cases.
  let record: LinkableRecord | null | undefined;
  if ("url" in pr || "html_url" in pr) record = await referenceFromPr(pr);
  if (!record && "title" in pr) record = await referenceToRecord(pr.title);
  if (!record && "headRef" in pr)
    record = await referenceToRecord(pr.headRef.name);
  if (!record && "head" in pr) record = await referenceToRecord(pr.head.ref);

  return record;
}

export async function getOrLinkPullRequestRecord(pr: IPullRequestLink) {
  const record = await getPullRequestRecord(pr);

  if (record) {
    // Always update the PR info on the record
    await updatePullRequestLinkOnRecord(pr, record);
  }

  return record;
}

export async function unlinkPullRequest(
  record: LinkableRecord,
  number: number
) {
  const prs = await record.getExtensionField<IPullRequestLink[]>(
    IDENTIFIER,
    PULL_REQUESTS_FIELD
  );
  const pr = prs?.find((pr) => pr.id === number);
  await record.setExtensionField(
    IDENTIFIER,
    PULL_REQUESTS_FIELD,
    prs?.filter((pr) => pr.id != number) || []
  );

  if (pr) {
    await aha.account.clearExtensionField(IDENTIFIER, pr.url);
  }
}

export async function unlinkPullRequests(record: LinkableRecord) {
  const prs = await record.getExtensionField<IPullRequestLink[]>(
    IDENTIFIER,
    PULL_REQUESTS_FIELD
  );
  if (prs) {
    for (let pr of prs) {
      await aha.account.clearExtensionField(IDENTIFIER, pr.url);
    }
  }

  await record.setExtensionField(IDENTIFIER, PULL_REQUESTS_FIELD, []);
}

export async function referenceToRecord(
  str: string
): Promise<null | LinkableRecord> {
  const ahaReference = extractReferenceFromName(str);
  if (!ahaReference) {
    return null;
  }
  console.log(
    `Searching for ${ahaReference.type} ref ${ahaReference.referenceNum}`
  );

  const RecordClass = aha.models[ahaReference.type];
  if (!RecordClass) {
    console.log(`Unknown record type ${ahaReference.type}`);
    return null;
  }

  // @ts-ignore
  return await RecordClass.select(["id", "referenceNum"]).find(
    ahaReference.referenceNum
  );
}

export async function referenceFromPr(
  pr: { url: string } | { html_url: string }
) {
  const linkUrl = "url" in pr ? pr.url : pr.html_url;

  const ref = await aha.account.getExtensionField<string>(IDENTIFIER, linkUrl);
  if (!ref) return null;

  return referenceToRecord(ref);
}
