import React from "react";
// @ts-ignore
import { titleize } from "https://cdn.skypack.dev/inflected";
import { GithubExtension } from "@lib/github/types";

const icon = (state: string) => {
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
  state: GithubExtension.PrState;
}> = ({ state }) => {
  return (
    <span className={`pr-state pr-state-${state.toLowerCase()}`}>
      <aha-flex gap="4px">
        <aha-icon
          icon={"fa-regular fa-" + icon(state.toLowerCase())}
        ></aha-icon>
        <span>{titleize(state)}</span>
      </aha-flex>
    </span>
  );
};
