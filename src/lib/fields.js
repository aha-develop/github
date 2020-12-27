import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";

async function appendField(ahaReference, fieldName, newValue) {
  // Link to Aha! record.
  console.log(`Link to ${ahaReference.type}:${ahaReference.referenceNum}`);

  // TODO: This API code is really hacky. It would be really nice to replace
  // it with the ApplicationModel structure from our framework. Perhaps with
  // a plugin GraphQL client so we can use raw fetch calls instead of Apollo
  // to reduce code side and dependencies.
  const result = await graphFetch(
    `{ 
        feature(id: "${ahaReference.referenceNum}") { 
          extensionFields(filters: {extensionIdentifier: "aha-develop.github", name: "${fieldName}"}) { 
            id 
            name 
            value
          } 
        } 
      }`
  );

  const extensionField = result.data.feature.extensionFields[0];
  let foundValue = false;
  let fieldValue = [];
  if (extensionField) {
    fieldValue = extensionField.value || [];
    fieldValue = fieldValue.map((e) => {
      if (e.id == newValue.id) {
        foundValue = true;
        // Replace the existing value.
        return newValue;
      } else {
        return e;
      }
    });
  }

  if (!foundValue) {
    fieldValue.push(newValue);
  }

  // Insert.
  await graphFetch(
    `mutation UpsertExtension($value: JSON) {
        createExtensionField(
          attributes: {
            extension: { id: "aha-develop.github" }, 
            extensionFieldableId: "${ahaReference.referenceNum}", 
            extensionFieldableType: "${ahaReference.type}", 
            name: "${fieldName}", 
            value: $value
          }
        ) {
          extensionField {
            id
          }
          errors {
            attributes {
              name
              messages
              fullMessages
            }
          }
        }
      }`,
    { value: fieldValue }
  );
}

async function graphFetch(query, variables = {}) {
  let headers = {
    "Content-Type": "application/json",
  };
  let url = "/api/v2/graphql";

  if (!window) {
    headers["Authorization"] = `Bearer ${Env.apiToken}`;
    url = Env.apiUrl;
  } else {
    headers["X-CSRF-Token"] = window.csrfToken();
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });

  if (response.status != 200) {
    throw new Error(
      `GraphQL fetch failed: ${response.status} ${
        response.statusText
      }: ${await response.text()}`
    );
  }
  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result;
}

async function linkPullRequest(pr) {
  const ahaReference = extractReference(pr.title) || extractReference(pr.body);
  if (!ahaReference) {
    return;
  }

  await appendField(ahaReference, "pullRequests", {
    id: pr.number,
    name: pr.title,
    url: pr.url || pr.html_url,
    state: pr.merged ? "merged" : pr.state,
  });
}

async function linkBranch(branchName, url) {
  const ahaReference = extractReference(branchName);
  if (!ahaReference) {
    return;
  }

  await appendField(ahaReference, "branches", {
    id: branchName,
    name: branchName,
    url: url,
  });
}

function extractReference(name) {
  let matches;

  // Requirement
  if ((matches = name.match(/[a-z]{1,10}-[0-9]+-[0-9]+/i))) {
    return {
      type: "Requirement",
      referenceNum: matches[0],
    };
  }
  // Epic
  if ((matches = name.match(/[a-z]{1,10}-E-[0-9]+/i))) {
    return {
      type: "Epic",
      referenceNum: matches[0],
    };
  }
  // Feature
  if ((matches = name.match(/[a-z]{1,10}-[0-9]+/i))) {
    return {
      type: "Feature",
      referenceNum: matches[0],
    };
  }

  // Done.
  return null;
}

function withGitHubApi(callback) {
  aha.auth(
    "github",
    {
      useCachedRetry: true,
      parameters: { scope: "repo" },
    },
    async (authData) => {
      const graphqlWithAuth = graphql.defaults({
        headers: {
          authorization: `token ${authData.token}`,
        },
      });

      await callback(graphqlWithAuth);
    }
  );
}

export { withGitHubApi, graphFetch, appendField, linkPullRequest, linkBranch };
