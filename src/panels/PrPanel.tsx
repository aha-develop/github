import React from "react";
import { PrTable } from "../components/page/PrTable";
import { IDENTIFIER } from "../extension";
import { searchForPr } from "../lib/github";
import GithubQuery from "../lib/query";
import { useGithubApi } from "../lib/useGithubApi";
import { AuthProvider } from "@aha-app/aha-develop-react";
import { Styles } from "../components/Styles";

const panel = aha.getPanel(IDENTIFIER, "prPanel", {
  name: "GitHub pull requests",
});

const PrPanel: React.FC<{
  filter: string;
  repos: string[];
}> = ({ filter, repos }) => {
  const query = [
    new GithubQuery()
      .repo(...repos, { quote: true })
      .is("pr")
      .toQuery(),
    filter,
  ]
    .filter(Boolean)
    .join(" ");

  const { authed, error, loading, data, fetchData } = useGithubApi(
    async (api) => {
      const { edges } = await searchForPr(api, {
        query,
        includeStatus: true,
        includeReviews: true,
        count: 10,
      });
      return edges.map((e) => e.node);
    },
    {},
    [query]
  );

  if (!authed || error) {
    return (
      <div className="page-content empty-state">
        <div
          className="empty-state__content"
          style={{ textAlign: "center", paddingTop: 50 }}
        >
          <p>Authenticate with GitHub to get started.</p>
          <aha-button type="primary" onClick={() => fetchData()}>
            Authenticate with GitHub
          </aha-button>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="page-content empty-state">
        <div className="empty-state__content">
          <div
            style={{
              fontSize: 36,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <aha-spinner />
          </div>
        </div>
      </div>
    );
  }

  return <PrTable prs={data} />;
};

panel.on("render", ({ props: { panel } }, { settings }) => {
  const filter = panel?.settings?.github_filter as string;
  const repos = (settings.repos || []) as string[];

  return (
    <>
      <Styles />
      <AuthProvider serviceName="github" serviceParameters={{}}>
        <PrPanel repos={repos} filter={filter} />
      </AuthProvider>
    </>
  );
});

panel.on({ action: "settings" }, () => {
  return [
    {
      type: "Text",
      key: "github_filter",
      title: "GitHub search query",
    },
  ];
});
