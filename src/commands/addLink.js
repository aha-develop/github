import { linkPullRequestToRecord } from "../lib/fields";
import { getPrByUrl, withGitHubApi } from "../lib/github";

const validPrUrl = (url) =>
  new URL(url).pathname.match(/\/[^\/]+\/[^\/]+\/pull\/\d+/);

aha.on("addLink", async ({ record, context }) => {
  const prUrl = await aha.commandPrompt("Link URL", {
    placeholder: "Enter the URL to a pull request",
  });

  if (!validPrUrl(prUrl)) {
    throw new Error("Please enter a valid pull request URL");
  }

  await withGitHubApi(async (api) => {
    const pullRequest = await getPrByUrl(api, prUrl);
    await linkPullRequestToRecord(pullRequest, record);
  });
});
