import { PrStatusesFragment } from "generated/graphql";

export function getStatusCommit(pr: PrStatusesFragment) {
  return pr.commits.nodes?.[0]?.commit;
}
