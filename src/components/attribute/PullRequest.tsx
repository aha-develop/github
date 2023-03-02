import { githubPullRequestToPrLink } from "@lib/github/converters";
import { getPrByUrl } from "@lib/github/getPr";
import { prStatusCommit } from "@lib/github/prStatusCommit";
import { LinkableRecord } from "@lib/linkableRecord";
import { updatePullRequestLinkOnRecord } from "@lib/linkPullRequest";
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

  // If the reloaded PR has changed state then update the extension fields
  useEffect(() => {
    if (loading) return;
    if (!fetchedPr) return;

    const prLink = githubPullRequestToPrLink(fetchedPr);
    if (prLink.state === prLink.state) return;

    updatePullRequestLinkOnRecord(prLink, record);
    setPrLink(prLink);
  }, [fetchedPr, loading]);

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
          <Status prStatus={prStatusCommit(fetchedPr)} />
          <PrReviewStatus pr={fetchedPr} />
        </>
      )}
    </aha-flex>
  );
};
