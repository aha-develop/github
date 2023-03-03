import { PrStatusesFragment } from "generated/graphql";

/**
 * Extract the status commit from a pull request as fetched from graphql
 */
export function getStatusCommit(pr: PrStatusesFragment) {
  return pr.commits?.nodes?.[0]?.commit;
}
