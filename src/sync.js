import { withGitHubApi, linkPullRequest } from "./lib/fields.js";

aha.on("sync", (record) => {
  console.log(`Syncing PRs for ${JSON.stringify(record)}`);

  aha.trigger(`aha-develop.github.pr.labeled`, {
    record: new aha.models.Feature({ id: "PLAT-3" }),
    label: { name: "documentation" },
  });

  withGitHubApi(async (api) => {
    const { search } = await api(`
    {
      search(query:"in:title in:body type:pr \\"${record.referenceNum}\\" repo:\\"jemmyw/small-mammals\\"", type: ISSUE, first:20 ) {
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
