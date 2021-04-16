import { useAuth } from "@aha-app/aha-develop-react";
import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";

/**
 * @typedef Options
 * @prop {any=} data Initial data
 */

/**
 * @template R
 * @typedef ReturnLoading
 * @prop {null} data
 * @prop {true} loading
 * @prop {boolean|null} authed
 * @prop {string|null} error
 * @prop {(() => Promise<boolean>)} fetchData
 */
/**
 * @template R
 * @typedef ReturnLoaded
 * @prop {R} data
 * @prop {false} loading
 * @prop {boolean|null} authed
 * @prop {string|null} error
 * @prop {(() => Promise<boolean>)} fetchData
 */
/**
 * @template R
 * @typedef {ReturnLoading<R>|ReturnLoaded<R>} UseGithubResponse
 */

/**
 * @template R
 * @param {((api: any) => Promise<R>)} callback
 * @param {Options} options
 * @param {*} deps
 * @return {UseGithubResponse<R>}
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
