import gql from "gql-tag";

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

/** @typedef {'CHANGES_REQUESTED' | 'APPROVED' | 'REVIEW_REQUIRED'} PullRequestReviewDecision */
/** @typedef {{commits: {nodes: {commit: CommitStatus}[]}}} PrWithStatus */
/** @typedef {{reviewDecision: PullRequestReviewDecision, latestReviews: {nodes: {state: PullRequestReviewDecision}[]}}} PrForReviewDecision */
/** @typedef {PrForLink & PrWithStatus} PrForLinkWithStatus */

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

export const PrForLinkFragment = gql`
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

export const PrForReviewDecisionFragment = gql`
  fragment PrForReviewDecision on PullRequest {
    reviewDecision
    latestReviews(first: 5) {
      nodes {
        state
      }
    }
  }
`;

export const PrStatusFragment = gql`
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


export const SearchForPr = gql`
  query searchForPr(
    $searchQuery: String!
    $count: Int!
    $includeStatus: Boolean = false
    $includeReviews: Boolean = false
  ) {
    search(query: $searchQuery, type: ISSUE, first: $count) {
      edges {
        node {
          __typename
          ... on PullRequest {
            ...PrForLink
            ...PrStatus @include(if: $includeStatus)
            ...PrForReviewDecision @include(if: $includeReviews)
          }
        }
      }
    }
  }

  ${PrForLinkFragment}
  ${PrStatusFragment}
  ${PrForReviewDecisionFragment}
`;

export const GetPr = gql`
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

export const RepoFragment = gql`
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
