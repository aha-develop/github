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
      await handlePullRequestReview(payload);
      break;
  }
});

const findAutomationTrigger = (payload): string => {
  const triggers: Record<string, (payload: any) => string>  = {
    closed: (payload) => (payload.pull_request.merged ? "prMerged" : "prClosed"),
    opened: (payload) => (payload.pull_request.draft ? "draftPrOpened" : "prOpened"),
    reopened: () => "prReopened",
    submitted: (payload) => {
      switch (payload.review.state) {
        case 'approved':
          return "prApproved"
        case 'changes_requested':
          return "prChangesRequested"
        default:
          return ""
      }
    }
  };

  return (triggers[payload.action] || (() => null))(payload);
}

async function triggerAutomation(payload, record) {
  if (!payload?.pull_request) return;

  // Check the record is a supported type
  if (!["Epic", "Feature", "Requirement"].includes(record.typename)) {
    return;
  }

  const trigger = findAutomationTrigger(payload)
  if (trigger) {
    console.log(`Found automation trigger ${trigger} from payload`)
    await aha.triggerAutomationOn(
      record,
      [IDENTIFIER, trigger].join("."),
      true
    );
  }
}

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
    await triggerAutomation(payload, record);
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

async function handlePullRequestReview(payload) {
  const pr = payload.pull_request;

  // Make sure the PR is linked to its record.
  const record = await linkPullRequest(pr);
  if (record) {
    await triggerAutomation(payload, record)
  }

  await triggerEvent("pull_request_review", payload, payload.pull_request?.title);
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
