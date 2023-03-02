import { graphql } from "@octokit/graphql";
import { DocumentNode, print } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

function toFetch(api: typeof graphql) {
  async function gqlFetch<TData = any, TVariables = Record<string, any>>(
    operation: TypedDocumentNode<TData, TVariables>,
    variables?: TVariables
  ): Promise<TData>;
  async function gqlFetch<TData = any, TVariables = Record<string, any>>(
    operation: DocumentNode,
    variables?: TVariables
  ): Promise<TData> {
    const query = print(operation);
    return api(query, variables as any);
  }

  return gqlFetch;
}

export type GqlFetch = ReturnType<typeof toFetch>;

export function authedGraphql(token: string): GqlFetch {
  return toFetch(
    graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    })
  );
}

export async function githubApi(cachedOnly = false) {
  const options: Aha.AuthOptions = {
    useCachedRetry: true,
    parameters: { scope: "repo" },
  };
  if (cachedOnly) {
    options["reAuth"] = false;
  }

  const authData = await aha.auth("github", options);
  return authedGraphql(authData.token);
}

export async function withGitHubApi<T>(
  callback: (api: GqlFetch) => Promise<T>
) {
  const api = await githubApi(false);
  return await callback(api);
}
