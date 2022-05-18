import React, { useMemo } from "react";
import GithubSearchQuery from "../../lib/github/GithubSearchQuery";
import { useGithubApi } from "../../lib/useGithubApi";
import { PrTableWithQuery } from "../PrTable";
import BranchTable from "./BranchTable";

export const PrPage = ({ repos }) => {
  const { authed, error, fetchData } = useGithubApi(async () => {});

  const baseQuery = useMemo(
    () => new GithubSearchQuery().repo(...repos, { quote: true }),
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
            <PrTableWithQuery
              query={baseQuery.is("pr").author("@me").state("open").toQuery()}
            />
          </div>

          <div className="subsection">
            <h3>Closed</h3>
            <PrTableWithQuery
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
          <aha-button onClick={() => fetchData()} kind="primary">
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
