import React from "react";
import { ExtensionRoot } from "../components/ExtensionRoot";
import { PrPage } from "../components/page/PrPage";

aha.on("prs", (_, { settings }) => {
  const repos = settings.repos || [];
  return (
    <ExtensionRoot>
      <PrPage repos={repos} />
    </ExtensionRoot>
  );
});
