import { AuthProvider } from "@aha-app/aha-develop-react";
import React from "react";
import { Page } from "./components/page/Page";
import { Styles } from "./components/Styles";

aha.on("prs", (_, { settings }) => {
  const repos = settings.repos || [];
  return (
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        <Page repos={repos} />
      </AuthProvider>
    </>
  );
});
