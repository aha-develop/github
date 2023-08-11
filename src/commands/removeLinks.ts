import { isLinkableRecord, LinkableRecord } from "@lib/linkableRecord";
import { unlinkBranches } from "@lib/linkBranch";
import { unlinkPullRequests } from "@lib/linkPullRequest";
import { webhookOnly } from "extension";

const RemoveLinks: Aha.CommandExtension<{ record: LinkableRecord }> = async ({
  record,
}: {
  record: LinkableRecord;
}) => {
  if (!record) return;
  if (!isLinkableRecord(record)) return;

  await unlinkPullRequests(record);
  await unlinkBranches(record);
};

if (!webhookOnly()) {
  aha.on("removeLinks", RemoveLinks);
}
