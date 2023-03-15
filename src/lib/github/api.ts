import { graphql } from "@octokit/graphql";
import { DocumentNode, print } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

/**
 * Wrap the github provided graphql function in a function that accepts a
 * graphql document node. This allows us to pass a precompiled document created
 * from the *.graphql files in ./queries and get typing for the input variables
 * and output data.
 */
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

/**
 * Take a token and return a wrapped authorized graphql function
 */
export function authedGraphql(token: string): GqlFetch {
  return toFetch(
    graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    })
  );
}

/**
 * Authenticate via Aha! and use the credentials to create a graphql function
 * for accessing GitHub
 *
 * @param cachedOnly Do not try to reauthenticate, just fail if there are no
 *   cached credentials
 * @returns
 */
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

/**
 * Authenticate via Aha! and pass the created graphql function to a callback
 */
export async function withGitHubApi<T>(
  callback: (api: GqlFetch) => Promise<T>
) {
  const api = await githubApi(false);
  return await callback(api);
}
