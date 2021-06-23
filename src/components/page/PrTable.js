import React, { useEffect, useState } from "react";
import { prStatusCommit, searchForPr } from "../../lib/github";
import { loadRelatedFeatures } from "../../lib/loadRelatedFeatures";
import { useGithubApi } from "../../lib/useGithubApi";
import { ExternalLink } from "../ExternalLink";
import { PrReviewStatus } from "../PrReviewStatus";
import { PrState } from "../PrState";
import { Status } from "../Status";

/**
 * @typedef QueryTableProps
 * @prop {string} query
 */

/**
 * @typedef TableProps
 * @prop {import('../../lib/github').PrForLink[]} prs
 */

/**
 * @typedef RowProps
 * @prop {import('../../lib/github').PrForLink} pr
 * @prop {Aha.Feature=} feature
 */

/**
 * @type {React.FC<RowProps>}
 */
const PrRow = ({ pr, feature }) => {
  const showDrawer = (event) => {
    if (feature) {
      event.preventDefault();
      aha.drawer.showRecord(feature);
    }
  };

  return (
    <tr>
      <td style={{ textOverflow: "ellipsis" }}>
        <div>
          <ExternalLink href={pr.url}>{pr.title}</ExternalLink>
        </div>
        {feature && (
          <div className="record-table--feature-link">
            <span className="bottom-left">&nbsp;</span>
            <a href={feature.path} onClick={showDrawer}>
              {feature.referenceNum} {feature.name}
            </a>
          </div>
        )}
      </td>
      <td>
        <PrState pr={pr} />
      </td>
      <td>
        <Status prStatus={prStatusCommit(pr)} />
      </td>
      <td>
        <PrReviewStatus pr={pr} />
      </td>
    </tr>
  );
};

/**
 * @type {React.FC<QueryTableProps>}
 */
export const PrTableWithQuery = ({ query }) => {
  const { authed, error, loading, data } = useGithubApi(
    async (api) => {
      const { edges } = await searchForPr(api, {
        query,
        includeStatus: true,
        includeReviews: true,
        count: 10,
      });
      return edges.map((e) => e.node);
    },
    {},
    [query]
  );

  if (!authed || error) return null;
  if (loading || !data) return <aha-spinner></aha-spinner>;

  return <PrTable prs={data} />;
};

/**
 * @type {React.FC<TableProps>}
 */
export const PrTable = ({ prs }) => {
  const [prRecords, setPrRecords] = useState({});

  useEffect(() => {
    let mounted = true;
    if (!prs) return;

    loadRelatedFeatures(prs).then((prRecords) => {
      if (!mounted) return;
      setPrRecords(prRecords);
    });

    return () => {
      mounted = false;
    };
  }, [prs]);

  const rows = prs.map((pr, idx) => (
    <PrRow key={idx} pr={pr} feature={prRecords[pr.number]} />
  ));

  return (
    <table className="record-table record-table--settings-page">
      <thead>
        <tr>
          <th>Pull request name</th>
          <th style={{ minWidth: "100px" }}>Status</th>
          <th>Checks</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
