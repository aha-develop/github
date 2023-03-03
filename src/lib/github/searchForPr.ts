import {
  PrForLinkFragment,
  SearchPullRequestDocument,
  SearchPullRequestQueryVariables,
} from "generated/graphql";
import { GqlFetch } from "./api";

interface SearchForPrOptions {
  query: string;
  count?: number;
}

export async function searchForPr(
  api: GqlFetch,
  options: SearchForPrOptions &
    Omit<SearchPullRequestQueryVariables, "searchQuery" | "count">
) {
  const variables: SearchPullRequestQueryVariables = {
    count: 20,
    searchQuery: options.query,
    ...options,
  };
  // @ts-ignore
  delete variables["query"];

  const data = await api(SearchPullRequestDocument, variables);
  const edges = data.search.edges;
  if (!edges) return [];

  const nodes = edges
    .map((edge) => edge?.node)
    .filter((node) => node?.__typename === "PullRequest");

  return nodes as PrForLinkFragment[];
}
