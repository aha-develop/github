import { AuthProvider, useAuth } from "@aha-app/aha-develop-react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Branches from "./components/Branches";
import Menu from "./components/Menu";
import PullRequests from "./components/PullRequest";

function Styles() {
  return (
    <style>
      {`
    .type-icon {
      font-size: 18px;
      color: #aaa;
      padding-right: 5px;
      vertical-align: middle;
    }

    .icon-button {
      border: 0;
    }

    .pr-state {
      display: inline-block;
      font-size: 12px;
      background-color: #aaa;
      color: white;
      padding: 1px 6px;
      border-radius: 4px;
      margin-left: 5px;
      text-transform: capitalize;
    }
    .pr-state-open {
      background-color: #28a745;
    }
    .pr-state-merged {
      background-color: #6f42c1;
    }
    .pr-state-closed {
      background-color: #d73a49;
    }
    .pr-state-draft {
      background-color: #6a737d;
    }

    .pr-status {
      margin-left: 5px;
      cursor: pointer;
      white-space: nowrap;
    }

    .pr-checks {
      font-size: 85%;
      z-index: 1000;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 2px 2px 7px #eeee;
      padding: 8px;
    }

    .pr-check-detail {
      margin-bottom: 2px;
    }

    .pr-icon {
      margin-right: 3px;
    }

    .pr-count {
      font-size: 12px;
      margin-left: 2px;
    }

    .hidden {
      opacity: 0.0;
    }

    .pr-check {
      vertical-align: middle;
    }
    .pr-check-error, .pr-check-failure {
      color: var(--aha-red-600);
    }
    .pr-check-expected, .pr-check-pending {
      color: var(--aha-yellow-600);
    }
    .pr-check-success {
      color: var(--aha-green-600);
    }
    `}
    </style>
  );
}

function App({ fields, record }) {
  const { error, authed } = useAuth(async () => {});

  const authError = error && <div>{error}</div>;

  const githubLinks =
    fields.branches || fields.pullRequests ? (
      <>
        <Branches fields={fields} />
        <PullRequests record={record} fields={fields}></PullRequests>
      </>
    ) : (
      <div>Not linked</div>
    );

  return (
    <aha-flex alignItems="center" justifycontent="space-between">
      {authError}
      {githubLinks}
      <Menu record={record} />
    </aha-flex>
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
