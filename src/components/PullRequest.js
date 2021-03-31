import React from "react";
import { unlinkPullRequest } from "../lib/fields";
import { fetchPrStatus } from "../lib/github";
import { useGithubApi } from "../lib/useGithubApi";
import reactPopper from 'https://cdn.skypack.dev/react-popper';

function Status({ record, pr }) {
  const { data: prStatus, error, authed, loading, fetch } = useGithubApi(
    async (api) => await fetchPrStatus(api, pr)
  );

  if (error) {
    return (
      <span className="pr-status">
        <aha-icon icon="fa-regular fa-warn"></aha-icon>
      </span>
    );
  }

  if (loading) {
    return (
      <span className="pr-status">
        <aha-icon icon="fa-regular fa-spinner fa-spin"></aha-icon>
      </span>
    );
  }

  if (authed === false) {
    return (
      <span className="pr-status">
        <button className="refresh" onClick={fetch}>
          <aha-icon icon="fa-regular fa-refresh"></aha-icon>
        </button>
      </span>
    );
  }

  return <span className="pr-status">{prStatus}</span>;
}

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

      <Status record={record} pr={pr} />
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
