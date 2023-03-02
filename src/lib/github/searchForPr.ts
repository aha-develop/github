import {
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
  return data.search;
}
