Aha.on("webhook", async ({ headers, payload }) => {
  const event = headers.HTTP_X_GITHUB_EVENT;

  console.log(
    `Received webhook ${headers.HTTP_X_GITHUB_EVENT} ${payload.action}`
  );

  switch (event) {
    case "create":
      await handleCreate(payload);
      break;
    case "push":
      handlePush(payload);
      break;
  }
});

function handlePush(payload) {}

async function handleCreate(payload) {
  // We only care about branches.
  if (payload.ref_type != "branch") {
    return;
  }

  const branchName = payload.ref;
  const ahaReference = extractReference(branchName);
  if (ahaReference) {
    // Link branch to Aha! record.
    console.log(`Link to ${ahaReference.type}:${ahaReference.referenceNum}`);

    // TODO: This API code is really hacky. It would be really nice to replace
    // it with the ApplicationModel structure from our framework. Perhaps with
    // a plugin GraphQL client so we can use raw fetch calls instead of Apollo
    // to reduce code side and dependencies.
    result = await graphFetch(
      `{ 
        feature(id: "${ahaReference.referenceNum}") { 
          extensionFields(filters: {extensionIdentifier: "aha-develop.github", name: "branches"}) { 
            id 
            name 
            value
          } 
        } 
      }`
    );

    const extensionField = result.data.feature.extensionFields[0];
    let branchValue = null;
    let newValue = [];
    if (extensionField) {
      newValue = extensionField.value || [];
      console.log(newValue);
      branchValue = newValue.find((e) => e.name == branchName);
    }

    if (!branchValue) {
      branchValue = newValue.push({ name: branchName });
    }
    // Insert.
    await graphFetch(
      `mutation UpsertExtension($value: JSON) {
        createExtensionField(
          attributes: {
            extension: { id: "aha-develop.github" }, 
            extensionFieldableId: "${ahaReference.referenceNum}", 
            extensionFieldableType: "${ahaReference.type}", 
            name: "branches", 
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
      { value: newValue }
    );
  }
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
  return await response.json();
}
