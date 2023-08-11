import { LinkableRecord } from "@lib/linkableRecord";
import { linkPullRequest } from "@lib/linkPullRequest";
import { validPrUrl } from "@lib/validPrUrl";
import { webhookOnly } from "extension";

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

if (!webhookOnly()) {
  aha.on("addLink", AddLink);
}
