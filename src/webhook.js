Aha.on("webhook", async ({ headers, payload }) => {
  console.log("start");

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

  console.log("done");
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

    fields = await graphFetch(
      `{ feature(id: "${ahaReference.referenceNum}") { extensionFields { id name value} } }`
    );

    console.log(fields);
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

async function graphFetch(query) {
  const response = await fetch(Env.apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Env.apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
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
