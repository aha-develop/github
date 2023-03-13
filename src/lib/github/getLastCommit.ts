import { PrCommitFragment } from "generated/graphql";

/**
 * Extract the last commit from a pull request as fetched from graphql
 */
export function getLastCommit(pr: PrCommitFragment) {
  return pr.commits?.nodes?.[0]?.commit;
}
