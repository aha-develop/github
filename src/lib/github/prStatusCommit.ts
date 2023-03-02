import { PrStatusesFragment } from "generated/graphql";

export function prStatusCommit(pr: PrStatusesFragment) {
  return pr.commits.nodes?.[0]?.commit;
}
