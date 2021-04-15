import { AuthProvider, useAuth } from "@aha-app/aha-develop-react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Branches from "./components/Branches";
import Menu from "./components/Menu";
import PullRequests from "./components/PullRequest";
import Styles from "./components/Styles";

function App({ fields, record }) {
  const { error, authed } = useAuth(async () => {});
  const authError = error && <div>{error}</div>;

  const isLinked = (fields.branches || fields.pullRequests || []).length > 0;
  const githubLinks = isLinked ? (
    <aha-flex direction="column" gap="8px" justifyContent="space-between">
      <Branches fields={fields} />
      <PullRequests prs={fields.pullRequests}></PullRequests>
    </aha-flex>
  ) : (
    <div>Not linked</div>
  );

  return (
    <>
      <aha-flex alignItems="center" justifycontent="space-between">
        {authError}
        {githubLinks}
        <Menu record={record} />
      </aha-flex>
    </>
  );
}

/** @type {HTMLDivElement} */
let container;

/**
 * @type {Aha.RenderExtension}
 */
function links({ record, fields, onUnmounted }) {
  container = document.createElement("div");
  render(
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        <App fields={fields} record={record} />
      </AuthProvider>
    </>,
    container
  );

  onUnmounted(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  return container;
}

aha.on("links", links);
