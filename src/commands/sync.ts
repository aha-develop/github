import { withGitHubApi } from "@lib/github/api";
import GithubSearchQuery from "@lib/github/GithubSearchQuery";
import { searchForPr } from "@lib/github/searchForPr";
import { LinkableRecord } from "@lib/linkableRecord";
import { updateAllLinksFromPullRequest } from "@lib/linkPullRequest";

const SyncCommand: Aha.CommandExtension<{ record: LinkableRecord }> = (
  { record },
  { settings }
) => {
  if (!record) {
    aha.commandOutput("Open a record first to sync PRs for that record");
    return;
  }
  console.log(`Syncing PRs for ${record.referenceNum}`);
  /** @type {string[]} */
  const repos = settings.repos as string[];

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
    const prs = await searchForPr(api, { query, includeStatus: true });

    if (prs.length === 0) {
      aha.commandOutput(
        `No pull requests found with ${record.referenceNum} in the title`
      );
      return;
    }

    for (let pr of prs) {
      await updateAllLinksFromPullRequest(pr, record as LinkableRecord);
    }
  });
};

aha.on("sync", SyncCommand);
