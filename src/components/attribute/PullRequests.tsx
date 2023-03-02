import { LinkableRecord } from "@lib/linkableRecord";
import { IPullRequestLink } from "extension";
import React from "react";
import { PullRequest } from "./PullRequest";

export const PullRequests: React.FC<{
  record: LinkableRecord;
  prs: IPullRequestLink[];
}> = ({ record, prs }) => {
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
