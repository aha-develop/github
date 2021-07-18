import gql from "gql-tag";

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

export const PrLabelsFragment = gql`
  fragment PrLabels on PullRequest {
    labels(first: 5) {
      nodes {
        color
        name
      }
    }
  }
`;

const PrIncludeParams = `
    $includeStatus: Boolean = false
    $includeReviews: Boolean = false
    $includeLabels: Boolean = false
`;

const PrIncludes = `
  ...PrForLink
  ...PrStatus @include(if: $includeStatus)
  ...PrForReviewDecision @include(if: $includeReviews)
  ...PrLabels @include(if: $includeLabels)
`;

export const SearchForPr = gql`
  query searchForPr(
    $searchQuery: String!
    $count: Int!
    ${PrIncludeParams}
  ) {
    search(query: $searchQuery, type: ISSUE, first: $count) {
      edges {
        node {
          __typename
          ... on PullRequest {
            ${PrIncludes}
          }
        }
      }
    }
  }

  ${PrForLinkFragment}
  ${PrStatusFragment}
  ${PrForReviewDecisionFragment}
  ${PrLabelsFragment}
`;

export const GetPr = gql`
  query GetPr(
    $name: String!
    $owner: String!
    $number: Int!
    ${PrIncludeParams}
  ) {
    repository(name: $name, owner: $owner) {
      pullRequest(number: $number) {
        __typename
        ${PrIncludes}
      }
    }
  }

  ${PrForLinkFragment}
  ${PrStatusFragment}
  ${PrForReviewDecisionFragment}
  ${PrLabelsFragment}
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

export function isPrForReviewDecision(
  pr: Github.Pr
): pr is Github.PrForReviewDecision {
  return Boolean(pr.latestReviews?.nodes);
}

export function isPrWithStatus(pr: Github.Pr): pr is Github.PrWithStatus {
  return Object.keys(pr).includes("commits");
}

export function isPrWithLabels(pr: Github.Pr): pr is Github.PrWithLabels {
  return Boolean(pr.labels?.nodes);
}
