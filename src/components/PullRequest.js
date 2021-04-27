import React from "react";
import { githubPrToPrLink } from "../lib/fields";
import { getPrByUrl, prStatusCommit } from "../lib/github";
import { useGithubApi } from "../lib/useGithubApi";
import PrState from "./PrState";
import { Status } from "./Status";

/**
 * @type {React.FC<{pr:import("../lib/fields").PrLink}>}
 */
const PullRequest = ({ pr }) => {
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

  // Once fetched replace the prop with the fetched version
  if (authed && fetchedPr) {
    pr = githubPrToPrLink(fetchedPr);
  }

  return (
    <div style={{ marginBottom: 3 }}>
      <aha-flex alignItems="center" justifyContent="space-between" gap="5px">
        <span>
          <a href={pr.url} rel="noopener noreferrer nofollow" target="_blank">
            {pr.name}
          </a>
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
        {authed && fetchedPr && <Status prStatus={prStatusCommit(fetchedPr)} />}
      </aha-flex>
    </div>
  );
};

/**
 * @type {React.FC<{prs:import("../lib/fields").PrLink[]}>}
 */
const PullRequests = ({ prs }) => {
  const pullRequests = (prs || []).map((pr, idx) => (
    <PullRequest key={idx} pr={pr} />
  ));

  return <div className="pull-requests">{pullRequests}</div>;
};

export default PullRequests;
