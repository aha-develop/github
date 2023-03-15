import { IBranchLink, IDENTIFIER } from "extension";
import { PrForLinkFragment } from "generated/graphql";
import { appendField } from "./fields";
import { LinkableRecord } from "./linkableRecord";

const BRANCHES_FIELD = "branches";

function replacePrefixInBranchName(branchName: string): string {
  return branchName.replace("refs/heads/", "");
}

export function branchUrl(repoUrl: string, branchName: string) {
  branchName = replacePrefixInBranchName(branchName);
  return `${repoUrl}/tree/${branchName}`;
}

/**
 * Link a branch to a given record
 */
export async function linkBranchToRecord(
  branchName: string,
  repoUrl: string,
  record: LinkableRecord
) {
  // Link to Aha! record.
  console.debug(
    `Link to ${record.typename}:${record["referenceNum"] || record.uniqueId}`
  );

  branchName = replacePrefixInBranchName(branchName);
  const url = branchUrl(repoUrl, branchName);

  await Promise.all([
    appendField(record, BRANCHES_FIELD, {
      id: branchName,
      name: branchName,
      url,
    }),
    aha.account.setExtensionField(IDENTIFIER, url, record.referenceNum),
  ]);
}

/**
 * Remove all linked branches on a record
 */
export async function unlinkBranches(record: Aha.HasExtensionFields) {
  const branches = await record.getExtensionField<IBranchLink[]>(
    IDENTIFIER,
    BRANCHES_FIELD
  );
  if (branches) {
    for (let branch of branches) {
      await aha.account.clearExtensionField(IDENTIFIER, branch.url);
    }
  }

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
