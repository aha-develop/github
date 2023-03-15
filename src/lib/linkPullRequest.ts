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
import { recordFromPrLink } from "./recordFrom";

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

export async function getOrLinkPullRequestRecord(pr: IPullRequestLink) {
  const record = await recordFromPrLink(pr);

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
