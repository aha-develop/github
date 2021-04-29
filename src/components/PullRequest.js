import React, { useEffect } from "react";
import { githubPrToPrLink, linkPullRequestToRecord } from "../lib/fields";
import { getPrByUrl, prStatusCommit } from "../lib/github";
import { useGithubApi } from "../lib/useGithubApi";
import ExternalLink from "./ExternalLink";
import { PrReviewStatus } from "./PrReviewStatus";
import PrState from "./PrState";
import { Status } from "./Status";

/**
 * @type {React.FC<{record:Aha.RecordStub, pr:import("../lib/fields").PrLink}>}
 */
const PullRequest = ({ record, pr }) => {
  const originalPr = pr;

  if (pr.title) {
    pr = { ...pr, ...githubPrToPrLink(pr) };
  }

  const { authed, data: fetchedPr, loading, error, fetchData } = useGithubApi(
    async (api) => {
      return await getPrByUrl(api, pr.url, {
        includeStatus: true,
        includeReviews: true,
      });
    }
  );

  // If the reloaded PR has changed state then update the extension fields
  useEffect(() => {
    if (loading) return;
    if (!fetchedPr) return;

    const prLink = githubPrToPrLink(fetchedPr);
    if (prLink.state === originalPr.state) return;

    linkPullRequestToRecord(fetchedPr, record);
  }, [fetchedPr, loading]);

  // Once fetched replace the prop with the fetched version
  if (authed && fetchedPr) {
    pr = githubPrToPrLink(fetchedPr);
  }

  return (
    <div style={{ marginBottom: 3 }}>
      <aha-flex align-items="center" justify-content="space-between" gap="5px">
        <span>
          <ExternalLink href={pr.url}>{pr.name}</ExternalLink>
        </span>
        <PrState pr={pr} />
        {loading && (
          <span className="pr-status">
            <aha-spinner />
          </span>
        )}
        {!loading && (!authed || !fetchedPr) && (
          <span className="pr-status">
            <aha-button onClick={fetchData}>
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
    </div>
  );
};

/**
 * @type {React.FC<{record: Aha.RecordStub, prs:import("../lib/fields").PrLink[]}>}
 */
const PullRequests = ({ record, prs }) => {
  const pullRequests = (prs || []).map((pr, idx) => (
    <PullRequest key={idx} record={record} pr={pr} />
  ));

  return <div className="pull-requests">{pullRequests}</div>;
};

export default PullRequests;
