import {
  githubPullRequestEventToPrLink,
  githubPullRequestReviewEventToPrLink,
} from "@lib/github/converters";
import { getOrLinkPullRequestRecord } from "@lib/linkPullRequest";
import {
  PullRequestEvent,
  PullRequestReviewEvent,
} from "@octokit/webhooks-types";
import { triggerAutomation } from "./triggerAutomation";
import { triggerEvent } from "./triggerEvent";

export async function handlePullRequest(payload: PullRequestEvent) {
  // Make sure the PR is linked to its record.
  const prLink = githubPullRequestEventToPrLink(payload.pull_request);
  const record = await getOrLinkPullRequestRecord(prLink);

  // Generate events.
  if (record) {
    await triggerEvent("pr", payload, record);
    await triggerAutomation(payload, record);
  } else {
    await triggerEvent("pr", payload);
  }
}

export async function handlePullRequestReview(payload: PullRequestReviewEvent) {
  // Make sure the PR is linked to its record.
  const prLink = githubPullRequestReviewEventToPrLink(payload.pull_request);
  const record = await getOrLinkPullRequestRecord(prLink);
  if (record) {
    await triggerAutomation(payload, record);
  }

  await triggerEvent(
    "pull_request_review",
    payload,
    payload.pull_request?.title
  );
}
