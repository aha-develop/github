import { linkBranch, linkPullRequest } from "../lib/fields";
import { withGitHubApi } from "../lib/github/api";
import GithubSearchQuery from "../lib/github/GithubSearchQuery";
import { searchForPr } from "../lib/github/searchForPr";

aha.on("sync", ({ record }, { settings }) => {
  if (!record) {
    aha.commandOutput("Open a record first to sync PRs for that record");
    return;
  }
  console.log(`Syncing PRs for ${record.referenceNum}`);
  /** @type {string[]} */
  const repos = settings.repos;

  if (!repos || repos.length === 0) {
    throw new Error(
      "No repos are configured. Go to Settings -> Account -> Extensions to configure repos."
    );
  }

  const query = new GithubSearchQuery()
    .in("title", "body")
    .type("pr")
    .repo(...repos, { quote: true })
    .term(record.referenceNum, { quote: true })
    .toQuery();

  withGitHubApi(async (api) => {
    const search = await searchForPr(api, { query });

    for (let prNode of search.edges) {
      const pr = prNode.node;

      await linkPullRequest(pr);

      if (pr.headRef) {
        await linkBranch(pr.headRef.name, pr.repository.url);
      }
    }
  });
});
