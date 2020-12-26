import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";
import { linkPullRequest } from "./lib/fields.js";

async function syncData(token) {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  const { search } = await graphqlWithAuth(`
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
}

aha.on("sync", () => {
  console.log("Syncing PRs");

  aha.auth(
    "github",
    {
      useCachedRetry: true,
      parameters: { scope: "repo" },
    },
    async (authData) => {
      console.log(`Authenticated`);
      await syncData(authData.token);
    }
  );
});
