import {
  PullRequestEvent,
  PullRequestReviewEvent,
  WorkflowRunCompletedEvent,
} from "@octokit/webhooks-types";
import {
  ActionWorkflowConclusion,
  IActionLink,
  IPullRequestLink,
} from "extension";
import { PrCommitFragment, PrForLinkFragment } from "generated/graphql";

/**
 * This file has functions to convert a PR from either a webhook or graphql to
 * the basic state information held in the extension field
 */

/**
 * Convert from data fetched from GitHub graphql API
 */
export function githubPullRequestToPrLink(
  pr: PrForLinkFragment
): IPullRequestLink {
  const state = pr.state.toLowerCase() as IPullRequestLink["state"];

  return {
    id: pr.number,
    name: pr.title,
    url: pr.url,
    state: pr.merged ? "merged" : state,
  };
}

/**
 * Convert from a pull request event
 */
export function githubPullRequestEventToPrLink(
  pr: PullRequestEvent["pull_request"]
): IPullRequestLink {
  return {
    id: pr.number,
    name: pr.title,
    url: pr.html_url || pr.url,
    state: pr.merged ? "merged" : pr.state,
  };
}

/**
 * Convert from a pull request review event
 */
export function githubPullRequestReviewEventToPrLink(
  pr: PullRequestReviewEvent["pull_request"]
): IPullRequestLink {
  return {
    id: pr.number,
    name: pr.title,
    url: pr.html_url || pr.url,
    state: pr.merged_at ? "merged" : pr.state,
  };
}

/**
 * Parse webhook payload to extension field by Resource Version
 *
 * @param payload
 * @returns
 */
export function githubWorkflowRunCompletedEventToActionLink(
  payload: WorkflowRunCompletedEvent
): IActionLink {
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
}

function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function githubPullRequestToActionLink(
  pr: PrForLinkFragment & PrCommitFragment
): IActionLink | undefined {
  const branch = pr.headRef?.name;
  if (isNil(branch)) return;

  const commit = pr.commits?.nodes?.[0]?.commit;
  if (isNil(commit)) return;

  const checkSuite = commit.checkSuites?.nodes?.[0];
  if (isNil(checkSuite)) return;

  const checkRun = checkSuite.checkRuns?.nodes?.[0];
  if (isNil(checkRun)) return;
  if (isNil(checkRun.conclusion)) return;

  const workflowRun = checkSuite.workflowRun;
  if (isNil(workflowRun)) return;

  const workflow = workflowRun.workflow;
  if (isNil(workflow)) return;
  if (isNil(workflow.databaseId)) return;

  const buildStatus =
    checkRun.conclusion.toLowerCase() as ActionWorkflowConclusion;

  return {
    project: {
      id: String(pr.repository.databaseId),
      name: pr.repository.name,
      url: pr.repository.url,
    },
    workflows: {
      [branch]: {
        id: workflow.databaseId,
        url: workflowRun.url,
        buildNumber: String(workflowRun.runNumber),
        buildStatus,
        startTime: workflowRun.createdAt,
        finishTime: workflowRun.updatedAt,
        name: workflow.name,
        commitHash: commit.oid,
        commitMsg: commit.message,
        branch: branch,
        authorName: checkSuite.creator?.login,
        authorURL: checkSuite.creator?.avatarUrl,
      },
    },
  };
}
