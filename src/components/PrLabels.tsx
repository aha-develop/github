import { PrLabelsFragment } from "generated/graphql";
import React from "react";

/**
 * Display the pull request labels as pills with the correct colors
 */
export const PrLabels: React.FC<{ pr: PrLabelsFragment }> = ({ pr }) => {
  const labels = (pr.labels?.nodes || [])

  const labelElements = labels.map(({ name, color }, idx) => (
    <span key={idx} className="pr-label">
      <aha-pill color={"#" + color}>{name}</aha-pill>
    </span>
  ));

  return (
    <aha-flex wrap="wrap" gap="5px">
      {labelElements}
    </aha-flex>
  );
};
