import {
  PullRequestEvent,
  PullRequestReviewEvent,
  WorkflowRunCompletedEvent,
} from "@octokit/webhooks-types";
import { IActionLink, IPullRequestLink } from "extension";
import { PrForLinkFragment } from "generated/graphql";

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
