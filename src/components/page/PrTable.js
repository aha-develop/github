import React from "react";
import { prStatusCommit, searchForPr } from "../../lib/github";
import { useGithubApi } from "../../lib/useGithubApi";
import ExternalLink from "../ExternalLink";
import { PrReviewStatus } from "../PrReviewStatus";
import PrState from "../PrState";
import { Status } from "../Status";

const PrRow = ({ pr }) => {
  return (
    <tr>
      <td style={{ textOverflow: "ellipsis" }}>
        <ExternalLink href={pr.url}>{pr.title}</ExternalLink>
      </td>
      <td>
        <PrState pr={pr} />
      </td>
      <td>
        <Status prStatus={prStatusCommit(pr)} />
      </td>
      <td>
        <PrReviewStatus pr={pr} />
      </td>
    </tr>
  );
};

const PrTable = ({ query }) => {
  const response = useGithubApi(
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

  if (!response.authed || response.error) return null;
  if (response.loading) return <aha-spinner></aha-spinner>;

  const rows = response.data.map((pr, idx) => <PrRow key={idx} pr={pr} />);

  return (
    <table className="record-table record-table--settings-page">
      <thead>
        <tr>
          <th>Pull request name</th>
          <th style={{ minWidth: "100px" }}>Status</th>
          <th>Checks</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default PrTable;
