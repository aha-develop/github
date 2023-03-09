import { LinkableRecord } from "@lib/linkableRecord";
import { recordFromReferenceNum } from "@lib/recordFrom";
import { WebhookEvent } from "@octokit/webhooks-types";

/**
 * Trigger an event from a webhook that other extensions can use
 */
export async function triggerEvent(
  event: string,
  payload: WebhookEvent,
  referenceText?: string | LinkableRecord
) {
  // Only trigger if there is an action
  if (!("action" in payload)) return;

  let record: null | LinkableRecord = null;

  if (typeof referenceText === "string") {
    record = await recordFromReferenceNum(referenceText);
  } else if (referenceText) {
    record = referenceText;
  }

  aha.triggerServer(`aha-develop.github.${event}.${payload.action}`, {
    record,
    payload,
  });
}
