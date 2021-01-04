import { linkPullRequest, linkBranch } from "./lib/fields.js";

aha.on("webhook", async ({ headers, payload }) => {
  const event = headers.HTTP_X_GITHUB_EVENT;

  console.log(`Received webhook ${event} ${payload.action || ""}`);

  switch (event) {
    case "create":
      await handleCreateBranch(payload);
      break;
    case "pull_request":
      handlePullRequest(payload);
      break;
  }
});

async function handlePullRequest(payload) {
  const pr = payload.pull_request;

  await linkPullRequest(pr);
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
