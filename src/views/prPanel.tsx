import React from "react";
import { ExtensionRoot } from "../components/ExtensionRoot";
import { PrPanel } from "../components/PrPanel";
import { TableCols } from "../components/PrTable/PrTable";
import { IDENTIFIER } from "../extension";

const panel = aha.getPanel(IDENTIFIER, "prPanel", {
  name: "GitHub pull requests",
});

const isTrue = (panelSetting: unknown) => String(panelSetting) === "true";

panel.on("render", ({ props: { panel } }, { settings }) => {
  const filter = panel?.settings?.github_filter as string;
  const repos = (settings.repos || []) as string[];
  const columns: TableCols = {
    ahaLink: isTrue(panel.settings.show_record),
    repoName: isTrue(panel.settings.show_repo),
    checks: isTrue(panel.settings.show_checks),
    reviews: isTrue(panel.settings.show_reviews),
    status: isTrue(panel.settings.show_status),
    labels: isTrue(panel.settings.show_labels),
  };

  return (
    <ExtensionRoot>
      <PrPanel repos={repos} filter={filter} columns={columns} />
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
    {
      type: "Checkbox",
      key: "show_repo",
      title: "Show respository name",
    },
    {
      type: "Checkbox",
      key: "show_record",
      title: "Show linked record",
    },
    {
      type: "Checkbox",
      key: "show_status",
      title: "Show status",
    },
    {
      type: "Checkbox",
      key: "show_checks",
      title: "Show checks",
    },
    {
      type: "Checkbox",
      key: "show_reviews",
      title: "Show reviewers",
    },
    {
      type: "Checkbox",
      key: "show_labels",
      title: "Show labels",
    },
  ] as Aha.PanelSetting[];
});
