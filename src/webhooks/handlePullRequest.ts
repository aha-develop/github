import {
  githubPullRequestEventToPrLink,
  githubPullRequestReviewEventToPrLink,
} from "@lib/github/converters";
import { linkBranchToRecord } from "@lib/linkBranch";
import { updatePullRequestLinkOnRecord } from "@lib/linkPullRequest";
import {
  recordFromPullRequestEvent,
  recordFromSimplePullRequest,
} from "@lib/recordFrom";
import {
  PullRequestEvent,
  PullRequestReviewEvent,
} from "@octokit/webhooks-types";
import { triggerAutomation } from "./triggerAutomation";
import { triggerEvent } from "./triggerEvent";

export async function handlePullRequest(payload: PullRequestEvent) {
  // Make sure the PR is linked to its record.
  const prLink = githubPullRequestEventToPrLink(payload.pull_request);
  const record = await recordFromPullRequestEvent(payload.pull_request);

  if (record) {
    updatePullRequestLinkOnRecord(prLink, record);

    // Link the branch to the record too
    try {
      const head = payload.pull_request.head;
      if (head) {
        await linkBranchToRecord(head.ref, head.repo.url, record);
      }
    } catch (error) {
      // Log but continue if the branch could not be linked
      console.error(
        `There was an error linking PR branch to record ${record.referenceNum}`
      );
    }

    // Trigger events
    await triggerEvent("pr", payload, record);
    await triggerAutomation(payload, record);
  } else {
    console.log("No record found for this PR");
    await triggerEvent("pr", payload);
  }
}

export async function handlePullRequestReview(payload: PullRequestReviewEvent) {
  // Make sure the PR is linked to its record.
  const prLink = githubPullRequestReviewEventToPrLink(payload.pull_request);
  const record = await recordFromSimplePullRequest(payload.pull_request);

  if (record) {
    await updatePullRequestLinkOnRecord(prLink, record);
    await triggerAutomation(payload, record);
  } else {
    console.log("No record found for this PR");
  }

  await triggerEvent("pull_request_review", payload, record || undefined);
}
