import { IDENTIFIER } from "../extension.js";
import {
  linkPullRequest,
  linkBranch,
  referenceToRecord,
} from "../lib/fields.js";

aha.on("webhook", async ({ headers, payload }) => {
  const event = headers.HTTP_X_GITHUB_EVENT;

  console.log(`Received webhook '${event}' ${payload.action || ""}`);

  switch (event) {
    case "create":
      await handleCreateBranch(payload);
      break;
    case "pull_request":
      await handlePullRequest(payload);
      break;
    case "pull_request_review":
      await triggerEvent(event, payload, payload.pull_request?.title);
      break;
  }
});

async function handlePullRequest(payload) {
  const pr = payload.pull_request;

  // Make sure the PR is linked to its record.
  const record = await linkPullRequest(pr);

  // Generate events.
  if (record) {
    if (pr.head?.name) {
      await linkBranch(pr.head.name, pr.repo.html_url);
    }

    await triggerEvent("pr", payload, record);

    if (
      record.typename === "Epic" ||
      record.typename === "Feature" ||
      record.typename === "Requirement"
    ) {
      switch (payload.action) {
        case "closed":
          if (payload.pull_request?.merged) {
            console.log("Triggering automation");
            await aha.triggerAutomationOn(
              record,
              [IDENTIFIER, "prMerged"].join("."),
              true
            );
          } else {
            await aha.triggerAutomationOn(
              record,
              [IDENTIFIER, "prState"].join("."),
              "closed"
            );
          }
          break;
        case "opened":
        case "reopened":
          await aha.triggerAutomationOn(
            record,
            [IDENTIFIER, "prState"].join("."),
            "opened"
          );
          break;
      }
    }
  } else {
    await triggerEvent("pr", payload, null);
  }
}

async function handleCreateBranch(payload) {
  // We only care about branches.
  if (payload.ref_type != "branch") {
    return;
  }

  const record = await linkBranch(payload.ref, payload.repository.html_url);
  await triggerEvent("create", payload, record);
}

/**
 * @param {string} event
 * @param {*} payload
 * @param {*} referenceText
 */
async function triggerEvent(event, payload, referenceText) {
  let record = referenceText;

  if (typeof referenceText === "string") {
    record = await referenceToRecord(referenceText);
  }

  aha.triggerServer(`aha-develop.github.${event}.${payload.action}`, {
    record,
    payload,
  });
}
