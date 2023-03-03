import { githubWorkflowRunCompletedEventToActionLink } from "@lib/github/converters";
import { LinkableRecord } from "@lib/linkableRecord";
import { saveActionInRecord } from "@lib/linkAction";
import { getPullRequestRecord, referenceToRecord } from "@lib/linkPullRequest";
import {
  WorkflowRunCompletedEvent,
  WorkflowRunEvent,
} from "@octokit/webhooks-types";
import { IActionLink } from "extension";

export async function handleWorkflowRun(event: WorkflowRunEvent) {
  if (event.action !== "completed") return;

  const recordField = githubWorkflowRunCompletedEventToActionLink(event);
  if (!recordField) {
    return;
  }

  // Find the record. Start by trying to find the record from the PR(s), then
  // try the branch name and then commit message
  let record: LinkableRecord | null | undefined;
  for (let pr of event.workflow_run.pull_requests) {
    record = await getPullRequestRecord(pr);
    if (record) break;
  }
  if (!record) record = await referenceToRecord(event.workflow_run.head_branch);
  if (!record)
    record = await referenceToRecord(event.workflow_run.head_commit.message);

  if (record) {
    await saveActionInRecord(record, recordField);
  }
}
