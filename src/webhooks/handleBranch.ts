import { linkBranchToRecord } from "@lib/linkBranch";
import { recordFromCreateEvent, recordFromPushEvent } from "@lib/recordFrom";
import { CreateEvent, PushEvent } from "@octokit/webhooks-types";
import { triggerEvent } from "./triggerEvent";

export async function handleCreateBranch(payload: CreateEvent) {
  if (!("ref_type" in payload) || payload.ref_type != "branch") {
    return;
  }

  const record = await recordFromCreateEvent(payload);

  if (record) {
    await linkBranchToRecord(payload.ref, payload.repository.html_url, record);
  }

  await triggerEvent("create", payload, record || undefined);
}

export async function handlePushBranch(payload: PushEvent) {
  const record = await recordFromPushEvent(payload);

  if (record) {
    await linkBranchToRecord(payload.ref, payload.repository.html_url, record);
  }

  await triggerEvent("push", payload, record || undefined);
}
