import { GithubActions } from "@lib/actions/githubActions";
import { ACTIONS_IDENTIFIER } from "@lib/extension";
import { getPullRequestRecord, referenceToRecord } from "@lib/fields";
import { LinkableRecord } from "@lib/linkableRecord";
import {
  WorkflowRunCompletedEvent,
  WorkflowRunEvent,
} from "@octokit/webhooks-types";

export async function handleWorkflowRun(event: WorkflowRunEvent) {
  if (event.action !== "completed") return;

  const recordField = parsePayloadToAction(event);
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

/**
 * Parse webhook payload to extension field by Resource Version
 *
 * @param payload
 * @returns
 */
const parsePayloadToAction = (
  payload: WorkflowRunCompletedEvent
): GithubActions.IActionField => {
  const { repository, workflow, workflow_run } = payload;

  return {
    project: {
      id: `${repository?.id}`,
      name: repository?.name,
      url: repository?.html_url,
    },
    workflows: {
      [workflow_run.head_branch]: {
        id: workflow?.id,
        url: workflow_run?.html_url,
        buildNumber: `${workflow_run.run_number}`,
        buildStatus: workflow_run.conclusion,
        startTime: workflow_run.run_started_at,
        finishTime: workflow_run.updated_at,
        name: workflow.name,
        commitHash: workflow_run?.head_sha,
        commitMsg: workflow_run?.head_commit?.message,
        branch: workflow_run?.head_branch,
        authorName: workflow_run?.actor?.login,
        authorURL: workflow_run?.actor?.avatar_url,
      },
    },
  };
};

/**
 * Save Github Actions in Record Field
 */
export const saveActionInRecord = async (
  record: LinkableRecord,
  githubAction: GithubActions.IActionField
): Promise<void> => {
  const projectId = githubAction.project?.id;
  if (!projectId) {
    throw new Error("Undefined Project Id");
  }

  // If Old Github actions exist, add or replace workflows
  const oldAction = await record.getExtensionField<GithubActions.IActionField>(
    ACTIONS_IDENTIFIER,
    projectId
  );

  if (oldAction) {
    githubAction = {
      ...oldAction,
      project: {
        ...(oldAction?.project ?? {}),
        ...(githubAction?.project ?? {}),
      },
      workflows: {
        ...(oldAction?.workflows ?? {}),
        ...(githubAction?.workflows ?? {}),
      },
    };
  }

  await record.setExtensionField(ACTIONS_IDENTIFIER, projectId, githubAction);
};
