import { IDENTIFIER } from "extension";
import { PrForLinkFragment } from "generated/graphql";
import { appendField } from "./fields";
import { LinkableRecord } from "./linkableRecord";
import { referenceToRecord } from "./linkPullRequest";

const BRANCHES_FIELD = "branches";

/**
 * Link a branch to a given record
 */
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

/**
 * Given some branch information, try to find and link a record
 */
export async function linkBranch(branchName: string, repoUrl: string) {
  const record = await referenceToRecord(branchName);
  if (record) {
    await linkBranchToRecord(branchName, repoUrl, record);
    return record;
  }
}

/**
 * Remove all linked branches on a record
 */
export async function unlinkBranches(record: Aha.HasExtensionFields) {
  await record.setExtensionField(IDENTIFIER, BRANCHES_FIELD, []);
}

/**
 * Given a pull request from the graphql API, if it has a branch then link that
 * branch to the given record.
 */
export async function updateBranchLinkFromPullRequest(
  pr: PrForLinkFragment,
  record: LinkableRecord
) {
  const branchName = pr.headRef?.name;

  if (branchName) {
    await linkBranchToRecord(branchName, pr.repository.url, record);
  }
}
