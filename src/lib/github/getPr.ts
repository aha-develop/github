import {
  GetPullRequestDocument,
  GetPullRequestQueryVariables,
} from "generated/graphql";
import { GqlFetch } from "./api";
import { repoFromUrl } from "./repoFromUrl";

export async function getPr(
  api: GqlFetch,
  variables: GetPullRequestQueryVariables
) {
  const data = await api(GetPullRequestDocument, variables);
  return data.repository?.pullRequest;
}

const prNumberFromUrl = (url: string) =>
  Number(new URL(url).pathname.split("/")[4]);

export async function getPrByUrl(
  api: GqlFetch,
  url: string,
  options: Omit<GetPullRequestQueryVariables, "owner" | "name" | "number"> = {}
) {
  const [owner, name] = repoFromUrl(url);
  const number = prNumberFromUrl(url);

  return getPr(api, { owner, name, number, ...options });
}
