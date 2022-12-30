import { classify } from "inflected";
import gql from "gql-tag";
import { RepoFragment } from "./queries";
import { graphql } from "@octokit/graphql";

const repoAlias = (repo: string) => classify(repo).replace(/[^a-zA-Z]/g, "");

const RepoBranches = (repo: string) => {
  const alias = repoAlias(repo);

  return gql`
    ${alias}: repository(name: $${alias}Name, owner: $${alias}Owner) {
      ...RepoFragment
    }
  `;
};

interface RecentBranch {
  nameWithOwner: string;
  refs: {
    edges: {
      node: {
        __typename: string;
        name: string;
        target: {
          oid: string;
          commitUrl: string;
        };
      };
    }[];
  };
}

export async function recentBranches(api: typeof graphql, repos: string[]) {
  const repoAliases = repos.map(repoAlias);
  const [queryArgs, queryVars] = repos.reduce(
    (acc, repo) => {
      const [owner, name] = repo.split("/");
      const alias = repoAlias(repo);
      acc[0].push("$" + alias + "Name: String!");
      acc[0].push("$" + alias + "Owner: String!");
      acc[1][alias + "Name"] = name;
      acc[1][alias + "Owner"] = owner;
      return acc;
    },
    [[] as string[], {} as Record<string, string>]
  );

  const query = gql`
    query GetRecentBranches(${queryArgs.join(", ")}) {
      ${repos.map(RepoBranches).join("\n")}
    }

    ${RepoFragment}
  `;

  const data = await api<Record<string, RecentBranch>>(query, queryVars);
  return repoAliases.map((alias) => data[alias]);
}
