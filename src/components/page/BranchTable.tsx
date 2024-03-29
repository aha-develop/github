import React from "react";
import { recentBranches } from "@lib/github/recentBranches";
import { useGithubApi } from "@lib/useGithubApi";
import { ExternalLink } from "@components/ExternalLink";
import { BranchFragmentFragment } from "generated/graphql";

const BranchRow: React.FC<{ branch: BranchFragmentFragment }> = ({
  branch,
}) => {
  return (
    <tr>
      <td>
        <ExternalLink href={branch.target?.commitUrl}>
          {branch.name}
        </ExternalLink>
      </td>
    </tr>
  );
};

const BranchTable: React.FC<{ repos: string[] }> = ({ repos }) => {
  const { data, authed, loading, error } = useGithubApi(
    async (api) => await recentBranches(api, repos),
    {},
    [repos]
  );

  if (!authed || error) return null;
  if (loading || !data) return <aha-spinner></aha-spinner>;

  const tables = data.map((repo, idx) => {
    const rows = [];
    const edges = repo.refs?.edges || [];

    for (let edge of edges) {
      const node = edge?.node;
      if (node) {
        rows.push(<BranchRow key={idx} branch={node} />);
      }
    }

    return (
      <div className="subsection" key={idx}>
        <h3>{repo.nameWithOwner}</h3>
        {rows.length === 0 ? (
          <div style={{ alignSelf: "center" }}>No branches to show</div>
        ) : (
          <table className="record-table record-table--settings-page">
            <thead>
              <tr>
                <th>Branch name</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        )}
      </div>
    );
  });

  return <>{tables}</>;
};

export default BranchTable;
