import { graphql } from "@octokit/graphql";

export async function githubApi(cachedOnly = false) {
  const options: Aha.AuthOptions = {
    useCachedRetry: true,
    parameters: { scope: "repo" },
  };
  if (cachedOnly) {
    options["reAuth"] = false;
  }

  const authData = await aha.auth("github", options);

  return graphql.defaults({
    headers: {
      authorization: `token ${authData.token}`,
    },
  });
}

export async function withGitHubApi<T>(
  callback: (api: typeof graphql) => Promise<T>
) {
  const api = await githubApi(false);
  return await callback(api);
}
