import { SearchForPr } from "./queries";

/**
 * @typedef SearchForPrOptions
 * @prop {string} query
 * @prop {number=} count
 * @prop {boolean=} includeStatus
 * @prop {boolean=} includeReviews
 */

/**
 * @param {import('./api').GithubApi} api
 * @param {SearchForPrOptions} options
 * @returns {Promise<{edges: {node: PrForLink}[]}>}
 */
export async function searchForPr(api, options) {
  const variables = { count: 20, searchQuery: options.query, ...options };
  // @ts-ignore
  delete variables["query"];
  const { search } = await api(SearchForPr, variables);
  return search;
}
