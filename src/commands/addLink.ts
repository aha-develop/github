import { withGitHubApi } from "@lib/github/api";
import {
  githubPullRequestToActionLink,
  githubPullRequestToPrLink,
} from "@lib/github/converters";
import { getPrByUrl } from "@lib/github/getPr";
import { LinkableRecord } from "@lib/linkableRecord";
import { linkActionToRecord } from "@lib/linkAction";
import { updateBranchLinkFromPullRequest } from "@lib/linkBranch";
import {
  linkPullRequest,
  updatePullRequestLinkOnRecord,
} from "@lib/linkPullRequest";
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

  await linkPullRequest(prUrl, record);
};

aha.on("addLink", AddLink);
