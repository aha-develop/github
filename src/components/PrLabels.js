import React from "react";

/**
 * Display the pull request labels as pills with the correct colors
 *
 * @type {React.FC<{pr: Github.PrWithLabels}>}
 */
export const PrLabels = ({ pr }) => {
  const labels = pr.labels.nodes.map(({ name, color }, idx) => (
    <span key={idx} className="pr-label">
      <aha-pill color={"#" + color}>{name}</aha-pill>
    </span>
  ));

  return (
    <aha-flex wrap="wrap" gap="5px">
      {labels}
    </aha-flex>
  );
};
