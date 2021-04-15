import { linkPullRequest, linkBranch } from "./lib/fields.js";

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
  }
});

async function handlePullRequest(payload) {
  const pr = payload.pull_request;

  // Make sure the PR is linked to its record.
  const record = await linkPullRequest(pr);

  // Generate events.
  if (record) {
    aha.triggerServer(`aha-develop.github.pr.${payload.action}`, {
      record: record,
      payload: payload,
    });
  }
}

async function handleCreateBranch(payload) {
  // We only care about branches.
  if (payload.ref_type != "branch") {
    return;
  }

  await linkBranch(
    payload.ref,
    `${payload.repository.html_url}/tree/${payload.ref}`
  );
}
