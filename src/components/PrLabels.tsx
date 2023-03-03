import { PrLabelsFragment } from "generated/graphql";
import React from "react";

/**
 * Display the pull request labels as pills with the correct colors
 */
export const PrLabels: React.FC<{ pr: PrLabelsFragment }> = ({ pr }) => {
  // This is annoying, I know that items in the array of labels cannot be null
  // but the schema lets them be null
  const nodes = pr.labels?.nodes ?? [];
  const labels = nodes as Exclude<typeof nodes[0], null>[];

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
