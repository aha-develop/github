import React from "react";
import ExternalLink from "./ExternalLink";

function Branches({ fields }) {
  if (!fields.branches || fields.branches.length === 0) return null;

  const branches = (fields.branches || []).map((branch, idx) => (
    <div key={idx}>
      <aha-flex gap="4px">
        <span className="type-icon">
          <aha-icon icon="fa-regular fa-code-branch type-icon" />
        </span>
        <ExternalLink href={branch.url}>{branch.name}</ExternalLink>
      </aha-flex>
    </div>
  ));

  return <div className="branches">{branches}</div>;
}

export default Branches;
