import React from "react";
import LinkTargetBlank from './LinkTargetBlank';

function Branches({ fields }) {
  const branches = (fields.branches || []).map((branch, idx) => (
    <div key={idx}>
      <aha-flex gap="4px">
        <span className="type-icon">
          <aha-icon icon="fa-regular fa-code-branch type-icon" />
        </span>
        <LinkTargetBlank href={branch.url}>
          {branch.name}
        </LinkTargetBlank>
      </aha-flex>
    </div>
  ));

  return <div className="branches">{branches}</div>;
}

export default Branches;
