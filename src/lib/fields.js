import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";

// Append a field/value pair to the given record. Returns an actual record
// instance if one existed.
async function appendField(ahaReference, fieldName, newValue) {
  // Link to Aha! record.
  console.log(`Link to ${ahaReference.type}:${ahaReference.referenceNum}`);

  // TODO: I really want this to look like:
  // await record.extensionField.select('id', 'name', 'value').reload()
  const record = await aha.models[ahaReference.type]
    .select("id", "referenceNum")
    .merge({
      extensionFields: aha.models.ExtensionField.where({
        extensionIdentifier: "aha-develop.github",
      }).select("id", "name", "value"),
    })
    .find(ahaReference.referenceNum);

  const extensionField = record.extensionFields[0];
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
  await aha.graphQLMutate(
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
    { variables: { value: fieldValue } }
  );

  // TODO: API calls above should return this object naturally.
  return new aha.models.Feature({
    id: record.id,
    referenceNum: record.referenceNum,
  });
}

async function linkPullRequest(pr) {
  const ahaReference = extractReference(pr.title);
  if (!ahaReference) {
    return;
  }

  return await appendField(ahaReference, "pullRequests", {
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

export { withGitHubApi, appendField, linkPullRequest, linkBranch };
