// @ts-ignore
import { classify } from "https://cdn.skypack.dev/inflected";
import gql from "gql-tag";
import { RepoFragment } from "./queries";

/**
 * @param {string} repo
 * @returns {string}
 */
const repoAlias = (repo) => classify(repo).replace(/[^a-zA-Z]/g, "");

/**
 * @param {string} repo
 */
const RepoBranches = (repo) => {
  const [owner, name] = repo.split("/");
  const alias = repoAlias(repo);

  return gql`
    ${alias}: repository(name: $${alias}Name, owner: $${alias}Owner) {
      ...RepoFragment
    }
  `;
};

/**
 * @param {import('./api').GithubApi} api
 * @param {string[]} repos
 * @returns
 */
export async function recentBranches(api, repos) {
  const repoAliases = repos.map(repoAlias);
  const [queryArgs, queryVars] = repos.reduce(
    (
      /** @type {[string[], {[index:string]: string}]} */
      acc,
      repo
    ) => {
      const [owner, name] = repo.split("/");
      const alias = repoAlias(repo);
      acc[0].push("$" + alias + "Name: String!");
      acc[0].push("$" + alias + "Owner: String!");
      acc[1][alias + "Name"] = name;
      acc[1][alias + "Owner"] = owner;
      return acc;
    },
    [[], {}]
  );

  const query = gql`
    query GetRecentBranches(${queryArgs.join(", ")}) {
      ${repos.map(RepoBranches).join("\n")}
    }

    ${RepoFragment}
  `;

  const data = await api(query, queryVars);
  return repoAliases.map((alias) => data[alias]);
}
