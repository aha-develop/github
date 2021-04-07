import React from "react";
import { githubPrToPrLink } from "../lib/fields";
import { FetchStatus } from "./Status";

/**
 * @param {{pr:import("../lib/fields").PrLink}} param0
 */
function PullRequest({ pr }) {
  if (pr.title) {
    pr = { ...pr, ...githubPrToPrLink(pr) };
  }

  return (
    <div style={{ marginBottom: 3 }}>
      <aha-flex alignitems="center" justifycontent="space-between">
        <span>
          <a href={pr.url} target="_blank">
            {pr.name}
          </a>
          <FetchStatus pr={pr} />
        </span>
        <span className={`pr-state pr-state-${pr.state.toLowerCase()}`}>
          {pr.state}
        </span>
      </aha-flex>
    </div>
  );
}

/**
 * @param {{prs:import("../lib/fields").PrLink[]}} param0
 */
function PullRequests({ prs }) {
  const pullRequests = (prs || []).map((pr, idx) => (
    <PullRequest key={idx} pr={pr} />
  ));

  return <div className="pull-requests">{pullRequests}</div>;
}

export default PullRequests;
