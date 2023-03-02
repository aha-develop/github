import { withGitHubApi } from "@lib/github/api";
import { githubPullRequestToPrLink } from "@lib/github/converters";
import { getPrByUrl } from "@lib/github/getPr";
import { LinkableRecord } from "@lib/linkableRecord";
import { updatePullRequestLinkOnRecord } from "@lib/linkPullRequest";
import { validPrUrl } from "@lib/validPrUrl";

const AddLink: Aha.CommandExtension<{ record: LinkableRecord }> = async ({
  record,
}: {
  record: LinkableRecord;
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
    if (!pullRequest) {
      throw new Error("Could not find this pull request");
    }

    const prLink = githubPullRequestToPrLink(pullRequest);
    await updatePullRequestLinkOnRecord(prLink, record);
  });
};

aha.on("addLink", AddLink);
