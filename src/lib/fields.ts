import {
  PullRequestEvent,
  PullRequestReviewEvent,
  WorkflowRun,
} from "@octokit/webhooks-types";
import { IDENTIFIER } from "./extension";
import { GithubExtension } from "./github/types";
import { LinkableRecord } from "./linkableRecord";

const PULL_REQUESTS_FIELD = "pullRequests";
const BRANCHES_FIELD = "branches";

export type PrRecord =
  | PullRequestEvent["pull_request"]
  | PullRequestReviewEvent["pull_request"]
  | GithubExtension.PrForLink;

/**
 * @typedef AccountPr
 * @prop {string} id
 * @prop {number} number
 * @prop {[string, string]} ahaReference
 */

/**
 * Append a field/value pair to the given record.
 */
async function appendField(
  record: LinkableRecord,
  fieldName: string,
  newValue: any
) {
  // Link to Aha! record.
  console.log(
    `Link to ${record.typename}:${record["referenceNum"] || record.uniqueId}`
  );

  await replaceField<any[]>(record, fieldName, (value) => {
    const list: { id: any }[] = [...(value || [])];
    const existing = list.findIndex((item) => item.id == newValue.id);

    if (existing > -1) {
      list.splice(existing, 1, newValue);
    } else {
      list.push(newValue);
    }

    return list;
  });
}

async function replaceField<T>(
  record: Aha.HasExtensionFields,
  fieldName: string,
  replacer: (value: T | null) => T | Promise<T>
) {
  const fieldValue = await record.getExtensionField(IDENTIFIER, fieldName);
  const newValue = await replacer(fieldValue as T);
  await record.setExtensionField(IDENTIFIER, fieldName, newValue);
}

/**
 * Convert a PR from either a webhook or graphql to the basic state information
 * held in the extension field
 */
function githubPrToPrLink(pr: PrRecord): GithubExtension.PrLink {
  const url = "html_url" in pr ? pr.html_url : pr.url;
  const merged = "merged" in pr ? pr.merged : false;
  const state = (
    merged
      ? "merged"
      : "state" in pr
      ? pr.state
      : (pr as { status: string }).status || "open"
  ).toLowerCase() as GithubExtension.PrState;

  return {
    id: pr.number,
    name: pr.title,
    url,
    state,
  };
}

async function updatePullRequestLinkOnRecord(
  pr: PrRecord,
  record: LinkableRecord
) {
  const prLink = githubPrToPrLink(pr);

  console.debug(
    `Updating PR #${pr.number} on ${record.typename} ${record.referenceNum}`
  );

  await appendField(record, PULL_REQUESTS_FIELD, prLink);
  await aha.account.setExtensionField(IDENTIFIER, pr.url, record.referenceNum);

  if ("headRef" in pr && pr.headRef) {
    await linkBranchToRecord(pr.headRef.name, pr.repository.url, record);
  } else if ("head" in pr && pr.head) {
    await linkBranchToRecord(pr.head.ref, pr.head.repo.url, record);
  }
}

/**
 * Find an Aha! record for a github pull request. The minimal amount of
 * information is required from the PR record, starting with url, html_url,
 * title, headRef: {name} and head: {ref}
 */
async function getPullRequestRecord(
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

async function getOrLinkPullRequestRecord(pr: PrRecord) {
  const record = await getPullRequestRecord(pr);

  if (record) {
    // Always update the PR info on the record
    await updatePullRequestLinkOnRecord(pr, record);
  }

  return record;
}

async function unlinkPullRequest(record: LinkableRecord, number: number) {
  const prs = await record.getExtensionField<GithubExtension.PrForLink[]>(
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

async function unlinkPullRequests(record: LinkableRecord) {
  const prs = await record.getExtensionField<GithubExtension.PrForLink[]>(
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

async function linkBranchToRecord(
  branchName: string,
  repoUrl: string,
  record: LinkableRecord
) {
  await appendField(record, BRANCHES_FIELD, {
    id: branchName,
    name: branchName,
    url: `${repoUrl}/tree/${branchName}`,
  });
}

async function linkBranch(branchName: string, repoUrl: string) {
  const record = await referenceToRecord(branchName);
  if (record) {
    await linkBranchToRecord(branchName, repoUrl, record);
    return record;
  }
}

async function unlinkBranches(record: Aha.HasExtensionFields) {
  await record.setExtensionField(IDENTIFIER, BRANCHES_FIELD, []);
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

function extractReferenceFromName(
  name: string
): null | { type: "Requirement" | "Epic" | "Feature"; referenceNum: string } {
  let matches;

  // Requirement
  if ((matches = name.match(/[a-z][a-z0-9]{0,9}-[0-9]+-[0-9]+/i))) {
    return {
      type: "Requirement",
      referenceNum: matches[0],
    };
  }
  // Epic
  if ((matches = name.match(/[a-z][a-z0-9]{0,9}-E-[0-9]+/i))) {
    return {
      type: "Epic",
      referenceNum: matches[0],
    };
  }
  // Feature
  if ((matches = name.match(/[a-z][a-z0-9]{0,9}-[0-9]+/i))) {
    return {
      type: "Feature",
      referenceNum: matches[0],
    };
  }

  return null;
}

export {
  appendField,
  getOrLinkPullRequestRecord,
  getPullRequestRecord,
  updatePullRequestLinkOnRecord,
  unlinkPullRequest,
  unlinkPullRequests,
  linkBranch,
  unlinkBranches,
  githubPrToPrLink,
};
