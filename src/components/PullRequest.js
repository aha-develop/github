import React from "react";
import { githubPrToPrLink } from "../lib/fields";
import PrState from "./PrState";
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
      <aha-flex alignitems="center" justifycontent="space-between" gap="5px">
        <span>
          <a href={pr.url} rel="noopener noreferrer nofollow" target="_blank">
            {pr.name}
          </a>
        </span>
        <PrState pr={pr} />
        <FetchStatus pr={pr} />
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
