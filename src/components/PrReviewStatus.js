import React from "react";
import { usePopperAlerter } from "../lib/usePopperAlerter";

/** @typedef {import('../lib/github').PrForLink & import('../lib/github').PrForReviewDecision} Pr */
/**
 * @typedef Props
 * @prop {Pr} pr
 */

/**
 *
 * @param {import('../lib/github').PullRequestReviewDecision} reviewStatus
 */
function icon(reviewStatus) {
  switch (reviewStatus) {
    case "REVIEW_REQUIRED":
      return "user";
    case "APPROVED":
      return "user-check";
    case "CHANGES_REQUESTED":
      return "user-edit";
  }
}

/**
 * @type {React.FC<Props>}
 */
export const PrReviewStatus = ({ pr }) => {
  const {
    attributes,
    popperElement,
    setReferenceElement,
    styles,
    toggle,
    visible,
  } = usePopperAlerter({
    delay: 100,
    modifiers: [],
  });

  const count = pr.latestReviews.nodes.length;

  return (
    <span className={`pr-reviews ${pr.reviewDecision.toLowerCase()}`}>
      <span
        onMouseOver={() => toggle(true)}
        ref={setReferenceElement}
        className="pr-reviews-icon"
      >
        <aha-icon icon={`fa-solid fa-${icon(pr.reviewDecision)}`} />
      </span>
      <span
        style={styles.popper}
        ref={popperElement}
        className={`pr-reviews-tooltip ${visible ? "" : "hidden"}`}
        {...attributes.popper}
      >
        {count} review{count > 1 ? "s" : ""}
      </span>
    </span>
  );
};
