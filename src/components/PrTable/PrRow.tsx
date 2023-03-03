import React from "react";
import { getStatusCommit } from "@lib/github/getStatusCommit";
import {
  isPrForReviewDecision,
  isPrWithLabels,
  isPrWithStatus,
} from "@lib/github/queries";
import { repoFromUrl } from "@lib/github/repoFromUrl";
import { ExternalLink } from "../ExternalLink";
import { PrLabels } from "../PrLabels";
import { PrReviewStatus } from "../PrReviewStatus";
import { PrState } from "../PrState";
import { Status } from "../Status";
import { TableCols } from "./PrTable";
import { PrForLinkFragment } from "generated/graphql";
import { githubPullRequestToPrLink } from "@lib/github/converters";

interface RowProps {
  pr: PrForLinkFragment;
  feature?: Aha.Feature;
  columns: TableCols;
}

export const PrRow: React.FC<RowProps> = ({ pr, feature, columns }) => {
  const showDrawer: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (feature) {
      event.preventDefault();
      aha.drawer.showRecord(feature);
    }
  };

  const prLink = githubPullRequestToPrLink(pr);
  const prStatus = isPrWithStatus(pr) && getStatusCommit(pr);

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
          <PrState state={prLink.state} />
        </td>
      )}
      {columns.checks && <td>{prStatus && <Status prStatus={prStatus} />}</td>}
      {columns.reviews && (
        <td>{isPrForReviewDecision(pr) && <PrReviewStatus pr={pr} />}</td>
      )}
      {columns.labels && <td>{isPrWithLabels(pr) && <PrLabels pr={pr} />}</td>}
    </tr>
  );
};
