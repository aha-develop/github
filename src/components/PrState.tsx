import React from "react";
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
  let label: string;

  switch (state) {
    case "closed":
      label = "Closed";
      break;
    case "merged":
      label = "Merged";
      break;
    case "open":
      label = "Open";
      break;
  }

  return (
    <span className={`pr-state pr-state-${state}`}>
      <aha-flex gap="4px">
        <aha-icon icon={"fa-regular fa-" + icon(state)}></aha-icon>
        <span>{label}</span>
      </aha-flex>
    </span>
  );
};
