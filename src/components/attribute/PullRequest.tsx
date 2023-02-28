import {
  githubPrToPrLink,
  PrRecord,
  updatePullRequestLinkOnRecord,
} from "@lib/fields";
import { getPrByUrl } from "@lib/github/getPr";
import { prStatusCommit } from "@lib/github/prStatusCommit";
import { GithubExtension } from "@lib/github/types";
import { LinkableRecord } from "@lib/linkableRecord";
import { useGithubApi } from "@lib/useGithubApi";
import React, { useEffect } from "react";
import { ExternalLink } from "../ExternalLink";
import { PrReviewStatus } from "../PrReviewStatus";
import { PrState } from "../PrState";
import { Status } from "../Status";

export const PullRequest: React.FC<{
  record: LinkableRecord;
  pr: PrRecord | GithubExtension.PrLink;
}> = ({ record, pr }) => {
  const originalPr = pr;
  let mergedPr = "title" in pr ? { ...pr, ...githubPrToPrLink(pr) } : pr;

  const {
    authed,
    data: fetchedPr,
    loading,
    error,
    fetchData,
  } = useGithubApi(async (api) => {
    return (await getPrByUrl(api, mergedPr.url, {
      includeStatus: true,
      includeReviews: true,
    })) as GithubExtension.PrWithStatus & GithubExtension.PrForReviewDecision;
  });

  // If the reloaded PR has changed state then update the extension fields
  useEffect(() => {
    if (loading) return;
    if (!fetchedPr) return;

    const prLink = githubPrToPrLink(fetchedPr);
    if (prLink.state === originalPr.state) return;

    updatePullRequestLinkOnRecord(fetchedPr, record);
  }, [fetchedPr, loading]);

  // Once fetched replace the prop with the fetched version
  if (authed && fetchedPr) {
    mergedPr = { ...mergedPr, ...githubPrToPrLink(fetchedPr) };
  }

  return (
    <aha-flex align-items="center" justify-content="space-between" gap="5px">
      <span>
        <ExternalLink href={mergedPr.url}>{mergedPr.name}</ExternalLink>
      </span>
      <PrState state={mergedPr.state} />
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
