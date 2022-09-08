import { IDENTIFIER } from "@lib/extension.js";
import {
  getOrLinkPullRequestRecord,
  linkBranch,
  referenceToRecord,
} from "@lib/fields.js";
import { LinkableRecord } from "@lib/linkableRecord.js";
import {
  CreateEvent,
  PullRequestEvent,
  PullRequestReviewEvent,
  WebhookEvent,
  WebhookEvents,
} from "@octokit/webhooks-types";

interface WebhookProps {
  headers: Record<string, string>;
  payload: WebhookEvent;
}

// Github has a list of all available events but for some reason its stuffed in
// an array type
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
type GithubWebhookEvent = ArrayElement<WebhookEvents>;

aha.on("webhook", async ({ headers, payload }: WebhookProps) => {
  const event = headers.HTTP_X_GITHUB_EVENT as GithubWebhookEvent;

  console.log(
    `Received webhook '${event}' ${"action" in payload ? payload.action : ""}`
  );

  // Flag the account as having successfully set up the webhook
  aha.account.setExtensionField(IDENTIFIER, "webhookConfigured", true);

  switch (event) {
    case "create":
      await handleCreateBranch(payload as CreateEvent);
      break;
    case "pull_request":
      await handlePullRequest(payload as PullRequestEvent);
      break;
    case "pull_request_review":
      await handlePullRequestReview(payload as PullRequestReviewEvent);
      break;
  }
});

const findAutomationTrigger = (
  payload: PullRequestEvent | PullRequestReviewEvent
) => {
  switch (payload.action) {
    case "closed":
      return payload.pull_request.merged ? "prMerged" : "prClosed";
    case "opened":
      return payload.pull_request.draft ? "draftPrOpened" : "prOpened";
    case "ready_for_review":
      return "draftReadyForReview";
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

async function triggerAutomation(
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

async function handlePullRequest(payload: PullRequestEvent) {
  const pr = payload.pull_request;

  // Make sure the PR is linked to its record.
  const record = await getOrLinkPullRequestRecord(pr);

  // Generate events.
  if (record) {
    await triggerEvent("pr", payload, record);
    await triggerAutomation(payload, record);
  } else {
    await triggerEvent("pr", payload);
  }
}

async function handleCreateBranch(payload: CreateEvent) {
  if (!("ref_type" in payload) || payload.ref_type != "branch") {
    return;
  }

  const record = await linkBranch(payload.ref, payload.repository.html_url);
  await triggerEvent("create", payload, record);
}

async function handlePullRequestReview(payload: PullRequestReviewEvent) {
  const pr = payload.pull_request;

  // Make sure the PR is linked to its record.
  const record = await getOrLinkPullRequestRecord(pr);
  if (record) {
    await triggerAutomation(payload, record);
  }

  await triggerEvent(
    "pull_request_review",
    payload,
    payload.pull_request?.title
  );
}

async function triggerEvent(
  event: string,
  payload: WebhookEvent,
  referenceText?: string | LinkableRecord
) {
  // Only trigger if there is an action
  if (!("action" in payload)) return;

  let record: null | LinkableRecord = null;

  if (typeof referenceText === "string") {
    record = await referenceToRecord(referenceText);
  } else if (referenceText) {
    record = referenceText;
  }

  aha.triggerServer(`aha-develop.github.${event}.${payload.action}`, {
    record,
    payload,
  });
}
