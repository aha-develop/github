import React from "react";
import { ExtensionRoot } from "../components/ExtensionRoot";
import { PrPanel } from "../components/PrPanel";
import { IDENTIFIER } from "../extension";

const panel = aha.getPanel(IDENTIFIER, "prPanel", {
  name: "GitHub pull requests",
});

panel.on("render", ({ props: { panel } }, { settings }) => {
  const filter = panel?.settings?.github_filter as string;
  const repos = (settings.repos || []) as string[];

  return (
    <ExtensionRoot>
      <PrPanel repos={repos} filter={filter} />
    </ExtensionRoot>
  );
});

panel.on({ action: "settings" }, () => {
  return [
    {
      type: "Text",
      key: "github_filter",
      title: "GitHub search query",
    },
  ];
});
