import { linkPullRequest } from "./lib/fields.js";
import { withGitHubApi } from "./lib/github.js";

const SEARCH_FOR_PR = `
  query searchForPr($searchQuery: String!) {
    search(query: $searchQuery, type: ISSUE, first:20 ) {
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
`;

aha.on("sync", (record, { settings }) => {
  console.log(
    `Syncing PRs for ${record.typename} ${record.id} ${record.referenceNum}`
  );
  /** @type {string[]} */
  const repos = settings.repos;

  if (!repos || repos.length === 0) {
    throw new Error(
      "No repos are configured. Go to Settings -> Account -> Extensions to configure repos."
    );
  }

  const repoQuery = repos.map((repo) => `repo:"${repo}"`);
  const searchQuery = `in:title in:body type:pr ${repoQuery} "${record.referenceNum}"`;

  withGitHubApi(async (api) => {
    const { search } = await api(SEARCH_FOR_PR, { searchQuery });

    for (let prNode of search.edges) {
      await linkPullRequest(prNode.node);
    }
  });
});
