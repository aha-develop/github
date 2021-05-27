import React from "react";
import { PullRequest } from "./PullRequest";

/**
 * @type {React.FC<{record: import("../../lib/fields").LinkableRecord, prs:import("../../lib/fields").PrLink[]}>}
 */
export const PullRequests = ({ record, prs }) => {
  const pullRequests = (prs || []).map((pr, idx) => (
    <PullRequest key={idx} record={record} pr={pr} />
  ));

  return (
    <div className="pull-requests">
      <aha-flex direction="column" gap="3px">
        {pullRequests}
      </aha-flex>
    </div>
  );
};
