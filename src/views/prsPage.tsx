import React from "react";
import { ExtensionRoot } from "../components/ExtensionRoot";
import { PrPage } from "../components/page/PrPage";

const PrsComponent: Aha.RenderExtension = (_, { settings }) => {
  const repos = settings.repos || [];
  return (
    <ExtensionRoot>
      <PrPage repos={repos} />
    </ExtensionRoot>
  );
};

aha.on("prs", PrsComponent);
