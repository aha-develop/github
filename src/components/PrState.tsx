import React from "react";
// @ts-ignore
import { titleize } from "https://cdn.skypack.dev/inflected";

/**
 * @param {'open'|'merged'|'closed'} state
 */
const icon = (state) => {
  switch (state) {
    case "open":
      return "code-branch";
    case "merged":
      return "code-merge";
    case "closed":
      return "code-branch";
  }
};

export const PrState = ({ pr }) => {
  return (
    <span className={`pr-state pr-state-${pr.state.toLowerCase()}`}>
      <aha-flex gap="4px">
        <aha-icon
          icon={"fa-regular fa-" + icon(pr.state.toLowerCase())}
        ></aha-icon>
        <span>{titleize(pr.state)}</span>
      </aha-flex>
    </span>
  );
};
