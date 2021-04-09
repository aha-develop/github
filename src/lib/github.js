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

const GetStatus = gql`
  query GetStatus($name: String!, $owner: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      pullRequest(number: $number) {
        ...PrStatus
      }
    }
  }

  ${PrStatusFragment}
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
 * @param {GithubApi} api
 * @param {{id:number,url:string}} pr
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

  return prStatusCommit(pullRequest);
}

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
  query GetPr($name: String!, $owner: String!, $number: Int!) {
    repository(name: $name, owner: $owner) {
      pullRequest(number: $number) {
        __typename
        ...PrForLink
      }
    }
  }

  ${PrForLinkFragment}
`;

/**
 * @param {*} api
 * @param {string} url
 */
export async function getPrByUrl(api, url) {
  const [owner, name] = repoFromUrl(url);
  const number = prNumberFromUrl(url);

  const {
    repository: { pullRequest },
  } = await api(GetPr, { owner, name, number });

  return pullRequest;
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
