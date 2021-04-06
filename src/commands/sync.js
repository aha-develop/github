import { linkPullRequest } from "../lib/fields.js";
import { searchForPr, withGitHubApi } from "../lib/github.js";

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
    const search = await searchForPr(api, searchQuery);

    for (let prNode of search.edges) {
      await linkPullRequest(prNode.node);
    }
  });
});
