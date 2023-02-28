import { GithubExtension } from "@lib/github/types";
import { LinkableRecord } from "@lib/linkableRecord";
import React from "react";
import { PullRequest } from "./PullRequest";

export const PullRequests: React.FC<{
  record: LinkableRecord;
  prs: GithubExtension.PrLink[];
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
