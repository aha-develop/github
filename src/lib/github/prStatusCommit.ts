export function prStatusCommit(pr: Github.PrWithStatus) {
  return pr.commits.nodes[0].commit;
}
