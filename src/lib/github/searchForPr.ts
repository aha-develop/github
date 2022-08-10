import { graphql } from "@octokit/graphql";
import { SearchForPr } from "./queries";

interface SearchForPrOptions {
  query: string;
  count?: number;
  includeStatus?: boolean;
  includeReviews?: boolean;
  includeLabels?: boolean;
}

export async function searchForPr(
  api: typeof graphql,
  options: SearchForPrOptions
) {
  const variables = { count: 20, searchQuery: options.query, ...options };
  // @ts-ignore
  delete variables["query"];
  const { search } = await api<{
    search: { edges: { node: Github.Pr }[] };
  }>(SearchForPr, variables);
  return search;
}
