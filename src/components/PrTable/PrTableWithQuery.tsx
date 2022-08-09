import React from "react";
import { searchForPr } from "../../lib/github/searchForPr";
import { useGithubApi } from "../../lib/useGithubApi";
import { PrTable } from "./PrTable";

/**
 * @typedef QueryTableProps
 * @prop {string} query
 * @prop {import('./PrTable').TableCols=} columns
 */

/**
 * @type {React.FC<QueryTableProps>}
 */
export const PrTableWithQuery = ({ query, columns }) => {
  const { authed, error, loading, data } = useGithubApi(
    async (api) => {
      const { edges } = await searchForPr(api, {
        query,
        includeStatus: true,
        includeReviews: true,
        count: 10,
      });
      return edges.map((e) => e.node);
    },
    {},
    [query]
  );

  if (!authed || error) return null;
  if (loading || !data) return <aha-spinner></aha-spinner>;

  return <PrTable prs={data} columns={columns} />;
};
