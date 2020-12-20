Aha.on("webhook", async ({ headers, payload }) => {
  const event = headers.HTTP_X_GITHUB_EVENT;

  console.log(`Received webhook ${event} ${payload.action || ""}`);

  switch (event) {
    case "create":
      await handleCreateBranch(payload);
      break;
    case "pull_request":
      handlePullRequest(payload);
      break;
  }
});

async function handlePullRequest(payload) {
  const pr = payload.pull_request;
  const ahaReference = extractReference(pr.title) || extractReference(pr.body);
  if (!ahaReference) {
    return;
  }

  await appendField(ahaReference, "pullRequests", {
    id: pr.number,
    name: pr.title,
    url: pr.html_url,
    state: pr.merged ? "merged" : pr.state,
  });
}

async function handleCreateBranch(payload) {
  // We only care about branches.
  if (payload.ref_type != "branch") {
    return;
  }

  const branchName = payload.ref;
  const ahaReference = extractReference(branchName);
  if (!ahaReference) {
    return;
  }

  await appendField(ahaReference, "branches", {
    id: payload.ref,
    name: payload.ref,
    url: `${payload.repository.html_url}/tree/${branchName}`,
  });
}

async function appendField(ahaReference, fieldName, newValue) {
  // Link to Aha! record.
  console.log(`Link to ${ahaReference.type}:${ahaReference.referenceNum}`);

  // TODO: This API code is really hacky. It would be really nice to replace
  // it with the ApplicationModel structure from our framework. Perhaps with
  // a plugin GraphQL client so we can use raw fetch calls instead of Apollo
  // to reduce code side and dependencies.
  result = await graphFetch(
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

async function graphFetch(query, variables = {}) {
  const response = await fetch(Env.apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Env.apiToken}`,
      "Content-Type": "application/json",
    },
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
  console.log(`Result: ${JSON.stringify(result)}`);
  return result;
}
