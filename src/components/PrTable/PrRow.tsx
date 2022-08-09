import React from "react";
import { prStatusCommit } from "../../lib/github/prStatusCommit";
import {
  isPrForReviewDecision,
  isPrWithLabels,
  isPrWithStatus,
} from "../../lib/github/queries";
import { repoFromUrl } from "../../lib/github/repoFromUrl";
import { ExternalLink } from "../ExternalLink";
import { PrLabels } from "../PrLabels";
import { PrReviewStatus } from "../PrReviewStatus";
import { PrState } from "../PrState";
import { Status } from "../Status";

/**
 * @typedef RowProps
 * @prop {Github.Pr} pr
 * @prop {Aha.Feature=} feature
 * @prop {import('./PrTable').TableCols} columns
 */

/**
 * @type {React.FC<RowProps>}
 */
export const PrRow = ({ pr, feature, columns }) => {
  const showDrawer = (event) => {
    if (feature) {
      event.preventDefault();
      aha.drawer.showRecord(feature);
    }
  };

  return (
    <tr>
      {columns.repoName && (
        <td>
          {pr.repository?.url && (
            <ExternalLink href={pr.repository.url}>
              {repoFromUrl(pr.repository.url).join("/")}
            </ExternalLink>
          )}
        </td>
      )}
      <td style={{ textOverflow: "ellipsis" }}>
        <div>
          <ExternalLink href={pr.url}>{pr.title}</ExternalLink>
        </div>
        {columns.ahaLink && feature && (
          <div className="record-table--feature-link">
            <span className="bottom-left">&nbsp;</span>
            <a href={feature.path} onClick={showDrawer}>
              {feature.referenceNum} {feature.name}
            </a>
          </div>
        )}
      </td>
      {columns.status && (
        <td>
          <PrState pr={pr} />
        </td>
      )}
      {columns.checks && (
        <td>
          {isPrWithStatus(pr) && <Status prStatus={prStatusCommit(pr)} />}
        </td>
      )}
      {columns.reviews && (
        <td>{isPrForReviewDecision(pr) && <PrReviewStatus pr={pr} />}</td>
      )}
      {columns.labels && <td>{isPrWithLabels(pr) && <PrLabels pr={pr} />}</td>}
    </tr>
  );
};
