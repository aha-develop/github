import { getPrByUrl } from "@lib/github/getPr";
import { getLastCommit } from "@lib/github/getLastCommit";
import { LinkableRecord } from "@lib/linkableRecord";
import { updateAllLinksFromPullRequest } from "@lib/linkPullRequest";
import { useGithubApi } from "@lib/useGithubApi";
import { IPullRequestLink } from "extension";
import React, { useEffect, useState } from "react";
import { ExternalLink } from "../ExternalLink";
import { PrReviewStatus } from "../PrReviewStatus";
import { PrState } from "../PrState";
import { Status } from "../Status";

export const PullRequest: React.FC<{
  record: LinkableRecord;
  pr: IPullRequestLink;
}> = ({ record, pr }) => {
  const [prLink, setPrLink] = useState(pr);

  const {
    authed,
    data: fetchedPr,
    loading,
    error,
    fetchData,
  } = useGithubApi(async (api) => {
    return await getPrByUrl(api, pr.url, {
      includeStatus: true,
      includeReviews: true,
    });
  });

  // If the real data from github gets loaded then use it to update the link on
  // the record
  useEffect(() => {
    if (loading) return;
    if (!fetchedPr) return;

    updateAllLinksFromPullRequest(fetchedPr, record);
    setPrLink(prLink);
  }, [fetchedPr, loading]);

  const prStatusCommit = fetchedPr && getLastCommit(fetchedPr);

  return (
    <aha-flex align-items="center" justify-content="space-between" gap="5px">
      <span>
        <ExternalLink href={prLink.url}>{prLink.name}</ExternalLink>
      </span>
      <PrState state={prLink.state} />
      {loading && (
        <span className="pr-status">
          <aha-spinner />
        </span>
      )}
      {!loading && (!authed || !fetchedPr) && (
        <span className="pr-status">
          <aha-button onClick={fetchData} size="small" kind="secondary">
            <aha-icon icon="fa-regular fa-refresh"></aha-icon>
          </aha-button>
        </span>
      )}
      {authed && fetchedPr && (
        <>
          {prStatusCommit && <Status prStatus={prStatusCommit} />}
          <PrReviewStatus pr={fetchedPr} />
        </>
      )}
    </aha-flex>
  );
};
