import { updatePullRequestLinkOnRecord } from "@lib/fields";
import { withGitHubApi } from "@lib/github/api";
import { getPrByUrl } from "@lib/github/getPr";
import { LinkableRecord } from "@lib/linkableRecord";
import { validPrUrl } from "@lib/validPrUrl";

const AddLink: Aha.CommandExtension<{ record: LinkableRecord }> = async ({
  record,
}) => {
  if (!record) return;

  const prUrl = await aha.commandPrompt("Link URL", {
    placeholder: "Enter the URL to a pull request",
  });

  if (!validPrUrl(prUrl)) {
    throw new Error("Please enter a valid pull request URL");
  }

  await withGitHubApi(async (api) => {
    const pullRequest = await getPrByUrl(api, prUrl);
    await updatePullRequestLinkOnRecord(pullRequest, record);
  });
};

aha.on("addLink", AddLink);
