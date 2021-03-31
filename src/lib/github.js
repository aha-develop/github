import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";

export async function githubApi(cachedOnly = false) {
  const options = { useCachedRetry: true, parameters: { scope: "repo" } };
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

export function withGitHubApi(callback) {
  githubApi(false).then((api) => callback(api));
}

/**
 * @param {string} url
 */
const repoFromUrl = (url) => new URL(url).pathname.split("/").slice(1, 3);

const GetStatus = `
  query GetStatus($name: String!, $owner: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      pullRequest(number: $number) {
        commits(last: 1) {
          nodes {
            commit {
              statusCheckRollup {
                state
              }
              status {
                contexts {
                  description
                  state
                  isRequired(pullRequestNumber: $number)
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * @typedef Context
 * @prop {string} description
 * @prop {string} state
 * @prop {boolean} isRequired
 */

/**
 * @typedef CommitStatus
 * @prop {{status: string}} statusCheckRollup
 * @prop {{contexts: Context[]}} status
 */

/**
 * @param {*} api
 * @param {*} pr
 * @returns {Promise<CommitStatus>}
 */
export async function fetchPrStatus(api, pr) {
  const [owner, name] = repoFromUrl(pr.url);
  const {
    repository: { pullRequest },
  } = await api(GetStatus, {
    owner,
    name,
    number: Number(pr.id),
  });

  return pullRequest.commits.nodes[0].commit;
}
