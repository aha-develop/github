import { IDENTIFIER } from "extension";
import { appendField } from "./fields";
import { LinkableRecord } from "./linkableRecord";
import { referenceToRecord } from "./linkPullRequest";

const BRANCHES_FIELD = "branches";

export async function linkBranchToRecord(
  branchName: string,
  repoUrl: string,
  record: LinkableRecord
) {
  await appendField(record, BRANCHES_FIELD, {
    id: branchName,
    name: branchName,
    url: `${repoUrl}/tree/${branchName}`,
  });
}

export async function linkBranch(branchName: string, repoUrl: string) {
  const record = await referenceToRecord(branchName);
  if (record) {
    await linkBranchToRecord(branchName, repoUrl, record);
    return record;
  }
}

export async function unlinkBranches(record: Aha.HasExtensionFields) {
  await record.setExtensionField(IDENTIFIER, BRANCHES_FIELD, []);
}
