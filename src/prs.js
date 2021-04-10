import { AuthProvider } from "@aha-app/aha-develop-react";
import React, { useMemo } from "react";
import BranchTable from "./components/page/BranchTable";
import PrTable from "./components/page/PrTable";
import Styles from "./components/Styles";
import GithubQuery from "./lib/query";
import { useGithubApi } from "./lib/useGithubApi";

const Page = ({ repos }) => {
  const { authed, error, fetchData } = useGithubApi(async () => {});
  const baseQuery = useMemo(
    () => new GithubQuery().repo(...repos, { quote: true }),
    []
  );

  let sections = null;

  if (authed) {
    sections = (
      <div className="sections">
        <section>
          <h2>My pull requests</h2>

          <div className="subsection">
            <h3>Open</h3>
            <PrTable
              query={baseQuery.is("pr").author("@me").state("open").toQuery()}
            />
          </div>

          <div className="subsection">
            <h3>Closed</h3>
            <PrTable
              query={baseQuery.is("pr").author("@me").state("closed").toQuery()}
            />
          </div>
        </section>

        <section>
          <h2>Recent branches</h2>

          <BranchTable repos={repos} />
        </section>
      </div>
    );
  } else if (error) {
    sections = (
      <div
        className="sections"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <section className="error">
          <p>An error occurred</p>
        </section>
      </div>
    );
  } else {
    sections = (
      <div className="sections" style={{ justifyContent: "center" }}>
        <section
          className="auth-prompt"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <aha-button onClick={() => fetchData()} type="primary">
            Authenticate with Github
          </aha-button>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-nav">
        <div className="page-nav__row  page-nav__row--justify-left page-nav__row--align-top">
          <div className="page-nav__cell">
            <h1>Github Pull Requests</h1>
          </div>
        </div>
      </div>
      {sections}
    </div>
  );
};

aha.on("prs", ({ settings }) => {
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
