import { githubWorkflowRunCompletedEventToActionLink } from "@lib/github/converters";
import { linkActionToRecord } from "@lib/linkAction";
import { recordFromWorkflowRun } from "@lib/recordFrom";
import { WorkflowRunEvent } from "@octokit/webhooks-types";

export async function handleWorkflowRun(event: WorkflowRunEvent) {
  if (event.action !== "completed") return;

  const recordField = githubWorkflowRunCompletedEventToActionLink(event);
  if (!recordField) {
    return;
  }

  // Find the record. Start by trying to find the record from the PR(s), then
  // try the branch name and then commit message
  const record = await recordFromWorkflowRun(event.workflow_run);

  if (record) {
    await linkActionToRecord(record, recordField);
  }
}
