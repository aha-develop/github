import React from "react";

function Branches({ fields }) {
  const branches = (fields.branches || []).map((branch, idx) => (
    <div key={idx}>
      <i className="fa-regular fa-code-branch type-icon" />
      <a href={branch.url} target="_blank">
        {branch.name}
      </a>
    </div>
  ));

  return <div className="branches">{branches}</div>;
}

export default Branches;
