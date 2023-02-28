import { unlinkBranches, unlinkPullRequests } from "@lib/fields";
import { isLinkableRecord, LinkableRecord } from "@lib/linkableRecord";

aha.on("removeLinks", async ({ record }: { record: LinkableRecord }) => {
  if (!record) return;
  if (!isLinkableRecord(record)) return;

  await unlinkPullRequests(record);
  await unlinkBranches(record);
});
