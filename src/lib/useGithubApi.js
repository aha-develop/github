import { useAuth } from "@aha-app/aha-develop-react";
import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";

/**
 * @typedef Options
 * @prop {any=} data Initial data
 */

/**
 * @template R
 * @param {((api: any) => Promise<R>)} callback
 * @param {Options} options
 * @param {*} deps
 * @return {{data:R|null, loading:boolean, authed:boolean|null, error:string|null, fetchData():Promise<boolean>}}
 */
export function useGithubApi(callback, options = {}, deps = []) {
  const authCallback = async (authData) => {
    const api = graphql.defaults({
      headers: {
        authorization: `token ${authData.token}`,
      },
    });
    return await callback(api);
  };

  return useAuth(authCallback, options, deps);
}
