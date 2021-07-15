import { GetPr } from "./queries";
import { repoFromUrl } from "./repoFromUrl";

/**
 * @typedef GetPrOptions
 * @prop {boolean=} includeStatus
 * @prop {boolean=} includeReviews
 */

/**
 * @param {import('./api').GithubApi} api
 * @param {string} owner
 * @param {string} name
 * @param {number} number
 * @param {GetPrOptions=} options
 * @returns {Promise<Github.Pr>}
 */
export async function getPr(api, owner, name, number, options = {}) {
  const {
    repository: { pullRequest },
  } = await api(GetPr, { owner, name, number, ...options });
  return pullRequest;
}

/**
 * @param {string} url
 */
const prNumberFromUrl = (url) => Number(new URL(url).pathname.split("/")[4]);

/**
 * @param {import('./api').GithubApi} api
 * @param {string} url
 * @param {GetPrOptions=} options
 */
export async function getPrByUrl(api, url, options = {}) {
  const [owner, name] = repoFromUrl(url);
  const number = prNumberFromUrl(url);

  return getPr(api, owner, name, number, options);
}
