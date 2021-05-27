import React from "react";
import { recentBranches } from "../../lib/github";
import { useGithubApi } from "../../lib/useGithubApi";
import { ExternalLink } from '../ExternalLink';

const BranchRow = ({ branch }) => {
  return (
    <tr>
      <td>
        <ExternalLink href={branch.target.commitUrl}>
          {branch.name}
        </ExternalLink>
      </td>
    </tr>
  );
};

/**
 * @param {{repos: string[]}} param0
 */
const BranchTable = ({ repos }) => {
  const { data, authed, loading, error } = useGithubApi(
    async (api) => await recentBranches(api, repos),
    {},
    [repos]
  );

  if (!authed || error) return null;
  if (loading || !data) return <aha-spinner></aha-spinner>;

  const tables = data.map((repo, idx) => {
    const rows = repo.refs.edges.map(({ node }, idx) => (
      <BranchRow key={idx} branch={node} />
    ));

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
