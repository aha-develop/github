import { AuthProvider } from "@aha-app/aha-develop-react";
import React, { useMemo } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PullRequests from "./components/PullRequest";
import Styles from "./components/Styles";
import { searchForPr } from "./lib/github";
import GithubQuery from "./lib/query";
import { useGithubApi } from "./lib/useGithubApi";

const PrList = ({ query }) => {
  const { data: prList, authed, loading, error } = useGithubApi(
    async (api) => {
      const prs = await searchForPr(api, { query, includeStatus: true });
      return prs.edges.map((e) => e.node);
    },
    {},
    [query]
  );

  if (!authed || error) return null;
  if (loading) return <aha-spinner></aha-spinner>;

  return (
    <div>
      <PullRequests prs={prList} />
    </div>
  );
};

const Page = ({ repos }) => {
  const { authed, error } = useGithubApi(async () => {});
  const baseQuery = useMemo(
    () => new GithubQuery().repo(...repos, { quote: true }),
    []
  );

  let sections = null;

  if (authed) {
    sections = (
      <>
        <section>
          <h2>Open</h2>
          <PrList query={baseQuery.author("@me").state("open").toQuery()} />
        </section>
        <section>
          <h2>Closed</h2>
          <PrList query={baseQuery.author("@me").state("closed").toQuery()} />
        </section>
      </>
    );
  } else {
  }

  return (
    <div>
      <h1>Github Pull Requests</h1>
      {sections}
    </div>
  );
};

aha.on("prs", (container, { settings }) => {
  const repos = settings.repos || [];
  render(
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{ scope: "repo" }}>
        <Page repos={repos} />
      </AuthProvider>
    </>,
    container
  );

  return () => {
    unmountComponentAtNode(container);
  };
});
