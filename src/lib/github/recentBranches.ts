import {
  RepoFragmentFragment,
  RepoFragmentFragmentDoc,
} from "generated/graphql";
import { GqlFetch } from "./api";

const repoAlias = (repo: string) => repo.replace(/[^a-zA-Z]/g, "");

const RepoBranches = (repo: string) => {
  const alias = repoAlias(repo);

  return `
    ${alias}: repository(name: $${alias}Name, owner: $${alias}Owner) {
      ...RepoFragment
    }
  `;
};

/**
 * Fetch a list of recent branches for the given list of repos
 */
export async function recentBranches(api: GqlFetch, repos: string[]) {
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

  const query = `
    query GetRecentBranches(${queryArgs.join(", ")}) {
      ${repos.map(RepoBranches).join("\n")}
    }

    ${RepoFragmentFragmentDoc}
  `;

  const data = await api<Record<string, RepoFragmentFragment>>(
    query,
    queryVars
  );
  return repoAliases.map((alias) => data[alias]);
}
