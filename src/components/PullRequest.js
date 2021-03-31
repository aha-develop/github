import React from "react";
import { unlinkPullRequest } from "../lib/fields";

function PullRequest({ record, pr }) {
  const handleUnlink = (number) => async () => {
    console.log("unlink", number);
    unlinkPullRequest(record, number);
  };

  return (
    <div>
      <a href={pr.url} target="_blank">
        {pr.name}
      </a>
      <span className={`pr-state pr-state-${pr.state.toLowerCase()}`}>
        {pr.state}
      </span>
      <button onClick={handleUnlink(pr.id)} className="icon-button">
        <aha-icon icon="fa-regular fa-trash fa-fw"></aha-icon>
      </button>
    </div>
  );
}

function PullRequests({ record, fields }) {
  const pullRequests = (fields.pullRequests || []).map((pr, idx) => (
    <PullRequest key={idx} record={record} pr={pr} />
  ));

  return <div>{pullRequests}</div>;
}

export default PullRequests;
