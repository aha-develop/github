import {
  PrForReviewDecisionFragment,
  PrLabelsFragment,
  PrStatusesFragment,
} from "generated/graphql";

export function isPrForReviewDecision(
  pr: any
): pr is PrForReviewDecisionFragment {
  return Boolean(pr.latestReviews?.nodes);
}

export function isPrWithStatus(pr: any): pr is PrStatusesFragment {
  return Object.keys(pr).includes("commits");
}

export function isPrWithLabels(pr: any): pr is PrLabelsFragment {
  return Boolean(pr.labels?.nodes);
}
