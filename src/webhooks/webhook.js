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

  console.log("Linking pull request")

  // Make sure the PR is linked to its record.
  const record = await linkPullRequest(pr);
  console.log("Done linking pull request")


  // Generate events.
  if (record) {
    console.log("Generating events");
    await triggerEvent("pr", payload, record);

    if (pr.head?.name) {
      console.log("Linking branch")
      await linkBranch(pr.head.name, pr.repo.html_url);
    }
  } else {
    console.log("null record, triggering event anyway")
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
