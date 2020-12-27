import { withGitHubApi, linkPullRequest } from "./lib/fields.js";

aha.on("sync", () => {
  console.log("Syncing PRs");
  withGitHubApi(async (api) => {
    const { search } = await api(`
    {
      search(query:"in:title in:body type:pr \\"PLAT-3\\" repo:\\"k1w1/racer_experiment\\"", type: ISSUE, first:20 ) {
        edges {
          node {
            __typename
            ... on PullRequest {
              id
              number
              title
              url
              state
              merged
            }
          }
        }
      }
    }
  `);
    console.log(search);

    for (let prNode of search.edges) {
      linkPullRequest(prNode.node);
    }
  });
});
