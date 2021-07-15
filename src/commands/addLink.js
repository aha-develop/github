import { linkPullRequestToRecord } from "../lib/fields";
import { withGitHubApi } from "../lib/github/api";
import { getPrByUrl } from "../lib/github/getPr";

const validPrUrl = urlString => {
  const url = new URL(urlString);
  return url.origin === "https://github.com" && url.pathname.match(/\/[^\/]+\/[^\/]+\/pull\/\d+/);
}

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
