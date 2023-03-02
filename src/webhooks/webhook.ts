import { EventPayloadMap, WebhookEvent } from "@octokit/webhooks-types";
import { IDENTIFIER } from "extension.js";
import { handleCreateBranch } from "./handleCreateBranch";
import {
  handlePullRequest,
  handlePullRequestReview,
} from "./handlePullRequest";
import { handleWorkflowRun } from "./handleWorkflowRun";

interface WebhookProps {
  headers: Record<string, string>;
  payload: WebhookEvent;
}

type EventHandlers = {
  [P in keyof EventPayloadMap]: (payload: EventPayloadMap[P]) => Promise<void>;
};

// Add additional handlers here
const eventHandlers: Partial<EventHandlers> = {
  create: handleCreateBranch,
  pull_request: handlePullRequest,
  pull_request_review: handlePullRequestReview,
  workflow_run: handleWorkflowRun,
};

aha.on("webhook", async ({ headers, payload }: WebhookProps) => {
  const event = headers.HTTP_X_GITHUB_EVENT as keyof EventPayloadMap;

  console.log(
    `Received webhook '${event}' ${"action" in payload ? payload.action : ""}`
  );

  // Flag the account as having successfully set up the webhook
  aha.account.setExtensionField(IDENTIFIER, "webhookConfigured", true);

  // Find a handler and run it if there is one
  const handler = eventHandlers[event];

  if (handler) {
    // @ts-ignore we know the payload type from the event but TS doesn't
    await handler(payload);
  }
});
