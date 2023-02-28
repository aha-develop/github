import { GithubExtension } from "./types";

export function prStatusCommit(pr: GithubExtension.PrWithStatus) {
  return pr.commits.nodes[0].commit;
}
