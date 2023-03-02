import {
  PullRequestEvent,
  PullRequestReviewEvent,
} from "@octokit/webhooks-types";
import { IPullRequestLink } from "extension";
import { PrForLinkFragment } from "generated/graphql";

/**
 * Convert a PR from either a webhook or graphql to the basic state information
 * held in the extension field
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
