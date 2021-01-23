import { withGitHubApi, linkPullRequest } from "./lib/fields.js";

aha.on("sync", (record) => {
  console.log(`Syncing PRs for ${JSON.stringify(record)}`);

  withGitHubApi(async (api) => {
    const { search } = await api(`
    {
      search(query:"in:title in:body type:pr \\"${record.referenceNum}\\" repo:\\"k1w1/racer_experiment\\"", type: ISSUE, first:20 ) {
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
      await linkPullRequest(prNode.node);
    }
  });
});
