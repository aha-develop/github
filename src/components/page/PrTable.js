import React from "react";
import { searchForPr } from "../../lib/github";
import { useGithubApi } from "../../lib/useGithubApi";
import PrState from "../PrState";
import { FetchStatus } from "../Status";

const PrRow = ({ pr }) => {
  return (
    <tr>
      <td>
        <a href={pr.url} rel="noopener noreferrer nofollow" target="_blank">
          {pr.title}
        </a>
      </td>
      <td>
        <PrState pr={pr} />
      </td>
      <td>
        <FetchStatus pr={pr} showCount={false} />
      </td>
    </tr>
  );
};

const PrTable = ({ query }) => {
  const { data: prList, authed, loading, error } = useGithubApi(
    async (api) => {
      const prs = await searchForPr(api, {
        query,
        includeStatus: true,
        count: 10,
      });
      return prs.edges.map((e) => e.node);
    },
    {},
    [query]
  );

  if (!authed || error) return null;
  if (loading) return <aha-spinner></aha-spinner>;

  const rows = prList.map((pr, idx) => <PrRow key={idx} pr={pr} />);

  return (
    <table className="record-table record-table--settings-page">
      <thead>
        <tr>
          <th>Pull request name</th>
          <th style={{ minWidth: "100px" }}>Status</th>
          <th>Checks</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default PrTable;
