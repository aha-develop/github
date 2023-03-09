import {
  Link,
  PullRequestEvent,
  SimplePullRequest,
  WorkflowRunEvent,
} from "@octokit/webhooks-types";
import { IDENTIFIER, IPullRequestLink } from "extension";
import { PrCommitFragment, PrForLinkFragment } from "generated/graphql";
import { extractReferenceFromName } from "./extractReferenceFromName";
import { withGitHubApi } from "./github/api";
import { getPrByUrl } from "./github/getPr";
import { getLastCommit } from "./github/getStatusCommit";
import { LinkableRecord } from "./linkableRecord";

export async function recordFromReferenceNum(
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

export async function recordFromUrl(url: string) {
  const ref = await aha.account.getExtensionField<string>(IDENTIFIER, url);
  if (!ref) return null;

  return recordFromReferenceNum(ref);
}

type Finder = () => Promise<LinkableRecord | null>;

async function recordFromFinders(finders: Finder[]) {
  for (let f of finders) {
    const record = await f();
    if (record) return record;
  }

  return null;
}

export async function recordFromPrLink(pr: IPullRequestLink) {
  return recordFromFinders([
    () => recordFromUrl(pr.url),
    () => recordFromReferenceNum(pr.name),
  ]);
}

export async function recordFromPrForLinkFragment(
  pr: PrForLinkFragment & PrCommitFragment
): Promise<LinkableRecord | null> {
  const finders = [
    () => recordFromUrl(pr.url),
    () => recordFromReferenceNum(pr.title),
  ];

  const branchName = pr.headRef?.name;
  if (branchName) {
    finders.push(() => recordFromReferenceNum(branchName));
  }

  // Find by the last commit message if all else has failed
  finders.push(async () => {
    let commitPr = pr.commits
      ? pr
      : await withGitHubApi((api) =>
          getPrByUrl(api, pr.url, { includeStatus: true })
        );
    if (!commitPr) return null;

    let commit = getLastCommit(commitPr);
    if (!commit) return null;

    return recordFromReferenceNum(commit.message);
  });

  return recordFromFinders(finders);
}

export async function recordFromPullRequestEvent(
  pr: PullRequestEvent["pull_request"]
): Promise<LinkableRecord | null> {
  return recordFromFinders([
    () => recordFromUrl(pr.html_url),
    () => recordFromReferenceNum(pr.title),
    () => recordFromReferenceNum(pr.head.ref),
  ]);
}

export async function recordFromSimplePullRequest(pr: SimplePullRequest) {
  return recordFromFinders([
    () => recordFromUrl(pr.html_url),
    () => recordFromReferenceNum(pr.title),
    () => recordFromReferenceNum(pr.head.ref),
  ]);
}

export async function recordFromWorkflowRun(
  run: WorkflowRunEvent["workflow_run"]
) {
  return recordFromFinders([
    async () => {
      let record: LinkableRecord | null;

      for (let pr of run.pull_requests) {
        record = await recordFromUrl(pr.url);
        if (record) return record;
      }

      return null;
    },
    () => recordFromReferenceNum(run.head_branch),
    () => recordFromReferenceNum(run.head_commit.message),
  ]);
}
