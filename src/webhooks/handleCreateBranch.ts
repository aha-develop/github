import { linkBranch } from "@lib/linkBranch";
import { CreateEvent } from "@octokit/webhooks-types";
import { triggerEvent } from "./triggerEvent";

export async function handleCreateBranch(payload: CreateEvent) {
  if (!("ref_type" in payload) || payload.ref_type != "branch") {
    return;
  }

  const record = await linkBranch(payload.ref, payload.repository.html_url);
  await triggerEvent("create", payload, record);
}
