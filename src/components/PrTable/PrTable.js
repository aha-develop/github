import React, { useEffect, useState } from "react";
import { loadRelatedFeatures } from "../../lib/loadRelatedFeatures";
import { PrRow } from "./PrRow";

/**
 * @typedef TableCols
 * @prop {boolean} repoName
 * @prop {boolean} ahaLink
 * @prop {boolean} status
 * @prop {boolean} checks
 * @prop {boolean} reviews
 * @prop {boolean} labels
 */

/**
 * @typedef TableProps
 * @prop {Github.PrForLink[]} prs
 * @prop {TableCols=} columns
 */

/** @type {TableCols} */
const defaultColumns = {
  repoName: false,
  ahaLink: true,
  status: true,
  checks: true,
  reviews: true,
  labels: false,
};

/**
 * @type {React.FC<TableProps>}
 */
export const PrTable = ({ prs, columns }) => {
  const shownColumns = columns ?? defaultColumns;
  const [prRecords, setPrRecords] = useState({});

  useEffect(() => {
    let mounted = true;

    if (prs && shownColumns.ahaLink) {
      loadRelatedFeatures(prs).then((prRecords) => {
        if (!mounted) return;
        setPrRecords(prRecords);
      });
    }

    return () => {
      mounted = false;
    };
  }, [prs, shownColumns.ahaLink]);

  const rows = prs.map((pr, idx) => (
    <PrRow
      key={idx}
      pr={pr}
      feature={prRecords[pr.number]}
      columns={shownColumns}
    />
  ));

  return (
    <table className="record-table record-table--settings-page">
      <thead>
        <tr>
          {shownColumns.repoName && <th>Repository</th>}
          <th>Pull request name</th>
          {shownColumns.status && <th style={{ minWidth: "100px" }}>Status</th>}
          {shownColumns.checks && <th>Checks</th>}
          {shownColumns.reviews && <th>Reviews</th>}
          {shownColumns.labels && <th>Labels</th>}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
