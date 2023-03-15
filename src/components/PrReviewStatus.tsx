import React from "react";
import { usePopperAlerter } from "@lib/usePopperAlerter";
import { PrForReviewDecisionFragment } from "generated/graphql";

interface Props {
  pr: PrForReviewDecisionFragment;
}

function icon(reviewStatus: PrForReviewDecisionFragment["reviewDecision"]) {
  switch (reviewStatus) {
    case "REVIEW_REQUIRED":
      return "user";
    case "APPROVED":
      return "user-check";
    case "CHANGES_REQUESTED":
      return "user-edit";
  }
}

export const PrReviewStatus: React.FC<Props> = ({ pr }) => {
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

  const count = pr.latestReviews?.nodes?.length || 0;

  return (
    <span className={`pr-reviews ${pr.reviewDecision?.toLowerCase()}`}>
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
