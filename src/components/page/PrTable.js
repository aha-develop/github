import React, { useEffect, useState } from "react";
import { prStatusCommit, searchForPr } from "../../lib/github";
import { useGithubApi } from "../../lib/useGithubApi";
import { ExternalLink } from "../ExternalLink";
import { PrReviewStatus } from "../PrReviewStatus";
import { PrState } from "../PrState";
import { Status } from "../Status";

const refNumMatcher = /([A-Z][A-Z0-9]*-(([E]|[0-9]+)-)?[0-9]+)/;

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

const PrTable = ({ query }) => {
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
  const [prRecords, setPrRecords] = useState({});

  useEffect(() => {
    let mounted = true;
    if (!data) return;

    const refNums = [];
    const prsByRefNum = {};

    for (let pr of data) {
      [pr.headRef?.name.toUpperCase(), pr.title]
        .map(String)
        .map((s) => refNumMatcher.exec(s))
        .forEach((match) => {
          if (match) {
            refNums.push(match[0]);
            prsByRefNum[match[0]] = pr;
          }
        });
    }

    if (refNums.length === 0) {
      // No records to find
      setPrRecords({});
      return;
    }

    aha.models.Feature.select("id", "referenceNum", "name", "path")
      .where({
        id: refNums,
      })
      .all()
      .then((features) => {
        if (!mounted) return;

        const prRecords = {};
        for (let feature of features) {
          const pr = prsByRefNum[feature.referenceNum];
          if (!pr) continue;
          prRecords[pr.number] = feature;
        }
        setPrRecords(prRecords);
      });

    return () => {
      mounted = false;
    };
  }, [data]);

  if (!authed || error) return null;
  if (loading || !data) return <aha-spinner></aha-spinner>;

  const rows = data.map((pr, idx) => (
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

export default PrTable;
