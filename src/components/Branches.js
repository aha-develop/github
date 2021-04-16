import React from "react";

function Branches({ fields }) {
  const branches = (fields.branches || []).map((branch, idx) => (
    <div key={idx}>
      <aha-flex gap="4px">
        <span className="type-icon">
          <aha-icon icon="fa-regular fa-code-branch type-icon" />
        </span>
        <a href={branch.url} target="_blank">
          {branch.name}
        </a>
      </aha-flex>
    </div>
  ));

  return <div className="branches">{branches}</div>;
}

export default Branches;
