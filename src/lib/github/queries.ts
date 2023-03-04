import {
  PrCommitFragment,
  PrForReviewDecisionFragment,
  PrLabelsFragment,
} from "generated/graphql";

/**
 * Functions for narrowing the type of data fetched from GitHub based on the keys in data.
 */

export function isPrForReviewDecision(
  pr: any
): pr is PrForReviewDecisionFragment {
  return Boolean(pr.latestReviews?.nodes);
}

export function isPrWithStatus(pr: any): pr is PrCommitFragment {
  return Object.keys(pr).includes("commits");
}

export function isPrWithLabels(pr: any): pr is PrLabelsFragment {
  return Boolean(pr.labels?.nodes);
}
