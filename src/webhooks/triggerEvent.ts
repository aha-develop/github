import { LinkableRecord } from "@lib/linkableRecord";
import { WebhookEvent } from "@octokit/webhooks-types";

/**
 * Trigger an event from a webhook that other extensions can use
 */
export async function triggerEvent(
  event: string,
  payload: WebhookEvent,
  record?: LinkableRecord
) {
  // Only trigger if there is an action
  if (!("action" in payload)) return;

  aha.triggerServer(`aha-develop.github.${event}.${payload.action}`, {
    record,
    payload,
  });
}
