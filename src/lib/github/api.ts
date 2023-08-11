import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { webhookOnly } from "extension";
import { DocumentNode } from "graphql";

/**
 * Wrap the github provided graphql function in a function that accepts a
 * graphql document node. This allows us to pass a precompiled document created
 * from the *.graphql files in ./queries and get typing for the input variables
 * and output data.
 */
function toFetch(token: string) {
  async function gqlFetch<TData = any, TVariables = Record<string, any>>(
    operation: TypedDocumentNode<TData, TVariables>,
    variables?: TVariables
  ): Promise<TData>;
  async function gqlFetch<TData = any, TVariables = Record<string, any>>(
    operation: DocumentNode | string,
    variables?: TVariables
  ): Promise<TData>;
  async function gqlFetch<TData = any, TVariables = Record<string, any>>(
    operation: any,
    variables?: TVariables
  ): Promise<TData> {
    const query = operation;
    const payload: any = { query };
    if (variables) payload.variables = variables;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
  }

  return gqlFetch;
}

export type GqlFetch = ReturnType<typeof toFetch>;

/**
 * Take a token and return a wrapped authorized graphql function
 */
export function authedGraphql(token: string): GqlFetch {
  return toFetch(token);
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
  if (webhookOnly()) {
    const error = new Error(
      "GitHub extension is set to webhook only mode. Cannot interact with GitHub API."
    );
    console.error(error);
    throw error;
  }

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
