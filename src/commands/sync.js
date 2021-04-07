import { linkPullRequest } from "../lib/fields.js";
import { searchForPr, withGitHubApi } from "../lib/github.js";
import GithubQuery from "../lib/query.js";

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

  const query = new GithubQuery()
    .in("title", "body")
    .type("pr")
    .repo(...repos, { quote: true })
    .term(record.referenceNum, { quote: true })
    .toQuery();

  withGitHubApi(async (api) => {
    const search = await searchForPr(api, { query });

    for (let prNode of search.edges) {
      await linkPullRequest(prNode.node);
    }
  });
});
