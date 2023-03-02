import { isLinkableRecord, LinkableRecord } from "@lib/linkableRecord";
import { unlinkBranches } from "@lib/linkBranch";
import { unlinkPullRequests } from "@lib/linkPullRequest";

aha.on("removeLinks", async ({ record }: { record: LinkableRecord }) => {
  if (!record) return;
  if (!isLinkableRecord(record)) return;

  await unlinkPullRequests(record);
  await unlinkBranches(record);
});
