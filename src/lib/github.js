import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";
import { classify } from "https://cdn.skypack.dev/inflected";
import gql from "gql-tag";

/** @typedef {(query:string,options?:{})=>Promise<any>} GithubApi */

/**
 * @returns {Promise<GithubApi>}
 */
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

/**
 *
 * @param {((api: GithubApi) => Promise<any>)} callback
 * @returns
 */
export function withGitHubApi(callback) {
  return githubApi(false).then((api) => callback(api));
}

/**
 * @param {string} url
 */
const repoFromUrl = (url) => new URL(url).pathname.split("/").slice(1, 3);
/**
 * @param {string} url
 */
const prNumberFromUrl = (url) => Number(new URL(url).pathname.split("/")[4]);

const PrForLinkFragment = gql`
  fragment PrForLink on PullRequest {
    id
    number
    title
    url
    state
    merged
    repository {
      url
    }
    headRef {
      name
    }
  }
`;

const PrForReviewDecisionFragment = gql`
  fragment PrForReviewDecision on PullRequest {
    reviewDecision
    latestReviews(first: 5) {
      nodes {
        state
      }
    }
  }
`;

/**
 * @typedef PrForLink
 * @prop {number} id
 * @prop {number} number
 * @prop {string} title
 * @prop {string} url
 * @prop {string} status
 * @prop {boolean} merged
 * @prop {{url: string}} repository
 * @prop {{name: string}|null} headRef
 */

/** @typedef {{commits: {nodes: {commit: CommitStatus}[]}}} PrWithStatus */
/** @typedef {PrForLink & PrWithStatus} PrForLinkWithStatus */

const PrStatusFragment = gql`
  fragment PrStatus on PullRequest {
    commits(last: 1) {
      nodes {
        commit {
          statusCheckRollup {
            state
          }
          status {
            contexts {
              context
              description
              targetUrl
              avatarUrl
              state
            }
          }
        }
      }
    }
  }
`;

/** @typedef {'EXPECTED'|'ERROR'|'FAILURE'|'SUCCESS'|'PENDING'} StatusState */

/**
 * @typedef Context
 * @prop {string} context
 * @prop {string} description
 * @prop {string} targetUrl
 * @prop {StatusState} state
 */

/**
 * @typedef CommitStatus
 * @prop {{state: StatusState} | null} statusCheckRollup
 * @prop {{contexts: Context[]} | null} status
 */

/**
 * @param {PrWithStatus} pr
 */
export function prStatusCommit(pr) {
  return pr.commits.nodes[0].commit;
}

const SearchForPr = gql`
  query searchForPr(
    $searchQuery: String!
    $count: Int!
    $includeStatus: Boolean = false
  ) {
    search(query: $searchQuery, type: ISSUE, first: $count) {
      edges {
        node {
          __typename
          ... on PullRequest {
            ...PrForLink
            ...PrStatus @include(if: $includeStatus)
          }
        }
      }
    }
  }

  ${PrForLinkFragment}
  ${PrStatusFragment}
`;

/**
 * @typedef SearchForPrOptions
 * @prop {string} query
 * @prop {number=} count
 * @prop {boolean=} includeStatus
 */

/**
 * @param {GithubApi} api
 * @param {SearchForPrOptions} options
 * @returns {Promise<{edges: {node: PrForLink}[] | {node: PrForLinkWithStatus}[]}>}
 */
export async function searchForPr(api, options) {
  /** @type {{}} */
  const variables = { count: 20, searchQuery: options.query, ...options };
  delete variables["query"];
  const { search } = await api(SearchForPr, variables);
  return search;
}

const GetPr = gql`
  query GetPr(
    $name: String!
    $owner: String!
    $number: Int!
    $includeStatus: Boolean = false
    $includeReviews: Boolean = false
  ) {
    repository(name: $name, owner: $owner) {
      pullRequest(number: $number) {
        __typename
        ...PrForLink
        ...PrStatus @include(if: $includeStatus)
        ...PrForReviewDecision @include(if: $includeReviews)
      }
    }
  }

  ${PrForLinkFragment}
  ${PrStatusFragment}
  ${PrForReviewDecisionFragment}
`;

/**
 * @typedef GetPrOptions
 * @prop {boolean=} includeStatus
 * @prop {boolean=} includeReviews
 */

/**
 * @param {GithubApi} api
 * @param {string} owner
 * @param {string} name
 * @param {number} number
 * @param {GetPrOptions=} options
 * @returns
 */
export async function getPr(api, owner, name, number, options = {}) {
  const {
    repository: { pullRequest },
  } = await api(GetPr, { owner, name, number, ...options });
  return pullRequest;
}

/**
 * @param {GithubApi} api
 * @param {string} url
 * @param {GetPrOptions=} options
 * @returns {Promise<PrForLink>}
 */
export async function getPrByUrl(api, url, options = {}) {
  const [owner, name] = repoFromUrl(url);
  const number = prNumberFromUrl(url);

  return getPr(api, owner, name, number, options);
}

const RepoFragment = gql`
  fragment RepoFragment on Repository {
    nameWithOwner
    refs(
      refPrefix: "refs/heads/"
      orderBy: { field: TAG_COMMIT_DATE, direction: ASC }
      first: 5
    ) {
      edges {
        node {
          __typename
          name
          target {
            oid
            commitUrl
          }
        }
      }
    }
  }
`;

/**
 * @param {string} repo
 * @returns {string}
 */
const repoAlias = (repo) => classify(repo).replace(/[^a-zA-Z]/g, "");

const RepoBranches = (repo) => {
  const [owner, name] = repo.split("/");
  const alias = repoAlias(repo);

  return gql`
    ${alias}: repository(name: $${alias}Name, owner: $${alias}Owner) {
      ...RepoFragment
    }
  `;
};

/**
 * @param {GithubApi} api
 * @param {string[]} repos
 * @returns
 */
export async function recentBranches(api, repos) {
  const repoAliases = repos.map(repoAlias);
  const [queryArgs, queryVars] = repos.reduce(
    (
      /** @type {[string[], {[index:string]: string}]} */
      acc,
      repo
    ) => {
      const [owner, name] = repo.split("/");
      const alias = repoAlias(repo);
      acc[0].push("$" + alias + "Name: String!");
      acc[0].push("$" + alias + "Owner: String!");
      acc[1][alias + "Name"] = name;
      acc[1][alias + "Owner"] = owner;
      return acc;
    },
    [[], {}]
  );

  const query = gql`
    query GetRecentBranches(${queryArgs.join(", ")}) {
      ${repos.map(RepoBranches).join("\n")}
    }

    ${RepoFragment}
  `;

  const data = await api(query, queryVars);
  return repoAliases.map((alias) => data[alias]);
}
