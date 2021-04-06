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
    <>
      <Branches fields={fields} />
      <PullRequests record={record} fields={fields}></PullRequests>
    </>
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

/**
 * @type {Aha.RenderExtension}
 */
function links(container, { record, fields }) {
  const root = container.parentNode;

  render(
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        <App fields={fields} record={record} />
      </AuthProvider>
    </>,
    container
  );

  return () => unmountComponentAtNode(container);
}

aha.on("links", links);
