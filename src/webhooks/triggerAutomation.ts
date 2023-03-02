import { LinkableRecord } from "@lib/linkableRecord";
import {
  PullRequestEvent,
  PullRequestReviewEvent,
} from "@octokit/webhooks-types";
import { IDENTIFIER } from "extension";

const findAutomationTrigger = (
  payload: PullRequestEvent | PullRequestReviewEvent
) => {
  switch (payload.action) {
    case "closed":
      return payload.pull_request.merged ? "prMerged" : "prClosed";
    case "opened":
      return payload.pull_request.draft ? "draftPrOpened" : "prOpened";
    case "converted_to_draft":
      return "draftPrOpened";
    case "ready_for_review":
      return "prOpened";
    case "reopened":
      return "prOpened";
    case "submitted":
      switch (payload.review.state) {
        case "approved":
          return "prApproved";
        case "changes_requested":
          return "prChangesRequested";
      }
  }

  return null;
};

export async function triggerAutomation(
  payload: PullRequestEvent | PullRequestReviewEvent,
  record: LinkableRecord
) {
  if (!payload?.pull_request) return;
  const { typename } = record;

  // Check the record is a supported type
  if (
    typename === "Epic" ||
    typename === "Feature" ||
    typename === "Requirement"
  ) {
    const trigger = findAutomationTrigger(payload);
    if (trigger) {
      console.log(`Found automation trigger ${trigger} from payload`);
      await aha.triggerAutomationOn(
        record,
        [IDENTIFIER, trigger].join("."),
        true
      );
    }
  }
}
