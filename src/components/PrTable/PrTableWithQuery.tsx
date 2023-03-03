import React from "react";
import { searchForPr } from "@lib/github/searchForPr";
import { useGithubApi } from "@lib/useGithubApi";
import { PrTable, TableCols } from "./PrTable";
import { PrForLinkFragment } from "generated/graphql";

interface QueryTableProps {
  query: string;
  columns?: TableCols;
}

export const PrTableWithQuery: React.FC<QueryTableProps> = ({
  query,
  columns,
}) => {
  const { authed, error, loading, data } = useGithubApi(
    async (api) => {
      return await searchForPr(api, {
        query,
        includeStatus: true,
        includeReviews: true,
        count: 10,
      });
    },
    {},
    [query]
  );

  if (!authed || error) return null;
  if (loading || !data) return <aha-spinner></aha-spinner>;

  return <PrTable prs={data} columns={columns} />;
};
