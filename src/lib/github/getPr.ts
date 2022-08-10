import { graphql } from "@octokit/graphql";
import { GetPr } from "./queries";
import { repoFromUrl } from "./repoFromUrl";

interface GetPrOptions {
  includeStatus?: boolean;
  includeReviews?: boolean;
}

export async function getPr(
  api: typeof graphql,
  owner: string,
  name: string,
  number: number,
  options: GetPrOptions = {}
) {
  const {
    repository: { pullRequest },
  } = await api<{ repository: { pullRequest: Github.Pr } }>(GetPr, {
    owner,
    name,
    number,
    ...options,
  });
  return pullRequest;
}

const prNumberFromUrl = (url: string) =>
  Number(new URL(url).pathname.split("/")[4]);

export async function getPrByUrl(
  api: typeof graphql,
  url: string,
  options: GetPrOptions = {}
) {
  const [owner, name] = repoFromUrl(url);
  const number = prNumberFromUrl(url);

  return getPr(api, owner, name, number, options);
}
