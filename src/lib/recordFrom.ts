import {
  CreateEvent,
  PullRequestEvent,
  PushEvent,
  SimplePullRequest,
  WorkflowRunEvent,
} from "@octokit/webhooks-types";
import { IDENTIFIER, IPullRequestLink } from "extension";
import { PrCommitFragment, PrForLinkFragment } from "generated/graphql";
import { extractReferenceFromName } from "./extractReferenceFromName";
import { withGitHubApi } from "./github/api";
import { getPrByUrl } from "./github/getPr";
import { getLastCommit } from "./github/getLastCommit";
import { LinkableRecord } from "./linkableRecord";
import { branchUrl } from "./linkBranch";

/**
 * Each of the exported finders at the bottom of this file are used to find a
 * record from a specific type.  Use these functions instead of searching
 * manually so that the details get logged consistently.
 */

/**
 * Given a string that might contain an Aha! reference number, extract the
 * number and find the appropriate record. Returns null if nothing was found.
 */
async function recordFromReferenceNum(
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

  try {
    // @ts-ignore
    const record = await RecordClass.select(["id", "referenceNum"]).find(
      ahaReference.referenceNum
    );
    return record;
  } catch (error) {
    const message = (error as Error).message || ("" as string);

    // A 404 indicates we just couldn't find the object
    if (message.includes("404")) {
      return null;
    }

    // Re-throw if it wasn't a 404
    throw error;
  }
}

/**
 * Given a URL use the extension fields we store at the account level to find
 * the relevant record. We store branch and pull request URLs here.
 */
async function recordFromUrl(url: string) {
  const ref = await aha.account.getExtensionField<string>(IDENTIFIER, url);
  if (!ref) return null;

  return recordFromReferenceNum(ref);
}

/**
 * A tuple that is a name and a function. The function should return a promise
 * of a record or null.
 */
type Finder = [string, () => Promise<LinkableRecord | null>];

/**
 * Take an ordered set of Finder tuples and try each one to find a record. If it
 * finds a record then the record is returned and the Finder name is logged.
 */
async function recordFromFinders(finders: Finder[]) {
  for (let [name, finder] of finders) {
    const record = await finder();
    if (record) {
      console.log(
        `Found ${record.typename} ${record.referenceNum} using ${name}`
      );
      return record;
    }
  }

  return null;
}

/**
 * Record from the link we keep in extension fields
 */
export async function recordFromPrLink(pr: IPullRequestLink) {
  return recordFromFinders([
    ["PR URL", () => recordFromUrl(pr.url)],
    ["PR title", () => recordFromReferenceNum(pr.name)],
  ]);
}

export async function recordFromPrForLinkFragment(
  pr: PrForLinkFragment & PrCommitFragment
): Promise<LinkableRecord | null> {
  const finders: Finder[] = [
    ["PR URL", () => recordFromUrl(pr.url)],
    ["PR Title", () => recordFromReferenceNum(pr.title)],
  ];

  const branchName = pr.headRef?.name;
  if (branchName) {
    finders.push(["PR branch name", () => recordFromReferenceNum(branchName)]);
    finders.push([
      "PR branch URL",
      () => recordFromUrl(branchUrl(pr.repository.url, branchName)),
    ]);
  }

  // Find by the last commit message if all else has failed
  finders.push([
    "PR last commit message",
    async () => {
      let commitPr = pr.commits
        ? pr
        : await withGitHubApi((api) =>
            getPrByUrl(api, pr.url, { includeStatus: true })
          );
      if (!commitPr) return null;

      let commit = getLastCommit(commitPr);
      if (!commit) return null;

      return recordFromReferenceNum(commit.message);
    },
  ]);

  return recordFromFinders(finders);
}

export async function recordFromPullRequestEvent(
  pr: PullRequestEvent["pull_request"]
): Promise<LinkableRecord | null> {
  return recordFromFinders([
    ["PR Title", () => recordFromReferenceNum(pr.title)],
    ["PR URL", () => recordFromUrl(pr.html_url)],
    ["PR branch name", () => recordFromReferenceNum(pr.head.ref)],
    [
      "PR branch URL",
      () => recordFromUrl(branchUrl(pr.head.repo.html_url, pr.head.ref)),
    ],
  ]);
}

export async function recordFromSimplePullRequest(pr: SimplePullRequest) {
  return recordFromFinders([
    ["PR URL", () => recordFromUrl(pr.html_url)],
    ["PR Title", () => recordFromReferenceNum(pr.title)],
    ["PR branch name", () => recordFromReferenceNum(pr.head.ref)],
    [
      "PR branch URL",
      () => recordFromUrl(branchUrl(pr.head.repo.html_url, pr.head.ref)),
    ],
  ]);
}

export async function recordFromWorkflowRun(
  run: WorkflowRunEvent["workflow_run"]
) {
  return recordFromFinders([
    [
      "Workflow run PR URL",
      async () => {
        let record: LinkableRecord | null;

        for (let pr of run.pull_requests) {
          record = await recordFromUrl(pr.url);
          if (record) return record;
        }

        return null;
      },
    ],
    [
      "Workflow run head branch name",
      () => recordFromReferenceNum(run.head_branch),
    ],
    [
      "Workflow run commit message",
      () => recordFromReferenceNum(run.head_commit.message),
    ],
    [
      "Workflow run branch URL",
      () => recordFromUrl(branchUrl(run.repository.html_url, run.head_branch)),
    ],
  ]);
}

export async function recordFromCreateEvent(payload: CreateEvent) {
  return recordFromFinders([
    ["Branch name", () => recordFromReferenceNum(payload.ref)],
  ]);
}

export async function recordFromPushEvent(payload: PushEvent) {
  const commit = payload.head_commit;
  if (!commit) return null;

  return recordFromFinders([
    ["Branch name", () => recordFromReferenceNum(payload.ref)],
    ["Commit message", () => recordFromReferenceNum(commit.message)],
  ]);
}
