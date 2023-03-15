import React from "react";
// @ts-ignore
import { titleize } from "https://cdn.skypack.dev/inflected";
import { IPullRequestLink } from "extension";

const icon = (state: IPullRequestLink["state"]) => {
  switch (state) {
    case "open":
      return "code-branch";
    case "merged":
      return "code-merge";
    case "closed":
      return "code-branch";
  }
};

export const PrState: React.FC<{
  state: IPullRequestLink["state"];
}> = ({ state }) => {
  return (
    <span className={`pr-state pr-state-${state}`}>
      <aha-flex gap="4px">
        <aha-icon icon={"fa-regular fa-" + icon(state)}></aha-icon>
        <span>{titleize(state)}</span>
      </aha-flex>
    </span>
  );
};
