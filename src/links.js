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

  const isLinked = [fields.branches, fields.pullRequests].some(
    (ary) => ary?.length > 0
  );

  const githubLinks = isLinked ? (
    <aha-flex direction="column" gap="8px" justify-content="space-between">
      <Branches fields={fields} />
      <PullRequests record={record} prs={fields.pullRequests}></PullRequests>
    </aha-flex>
  ) : (
    <div>Not linked</div>
  );

  return (
    <>
      <aha-flex align-items="center" justify-content="space-between" gap="5px">
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
const links = ({ record, fields }) => {
  return (
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        <App fields={fields} record={record} />
      </AuthProvider>
    </>
  );
};

aha.on("links", links);
