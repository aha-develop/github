import { graphql } from "https://cdn.skypack.dev/@octokit/graphql";
const identifier = "aha-develop.github";

// Append a field/value pair to the given record. Returns an actual record
// instance if one existed.
async function appendField(record, fieldName, newValue) {
  console.log(record);
  // Link to Aha! record.
  console.log(`Link to ${record.typename}:${record.referenceNum}`);

  let fieldValue =
    (await record.getExtensionField("aha-develop.github", fieldName)) || [];
  let foundValue = false;
  fieldValue = fieldValue.map((e) => {
    if (e.id == newValue.id) {
      foundValue = true;
      // Replace the existing value.
      return newValue;
    } else {
      return e;
    }
  });

  if (!foundValue) {
    fieldValue.push(newValue);
  }

  await record.setExtensionField(identifier, fieldName, fieldValue);
}

async function linkPullRequest(pr) {
  const record = await referenceToRecord(pr.title);
  if (record) {
    await appendField(record, "pullRequests", {
      id: pr.number,
      name: pr.title,
      url: pr.html_url,
      state: pr.merged ? "merged" : pr.state,
    });

    console.log(aha.account);
    await appendField(aha.account, "pullRequests", {
      id: [pr.number, record.referenceNum].join(""),
      prNumber: pr.number,
      ahaReference: [record.typename, record.referenceNum],
    });
  }

  return record;
}

export async function allPrs() {
  const prs = await aha.account.getExtensionField(identifier, "pullRequests");
  return prs || [];
}

async function linkBranch(branchName, url) {
  const record = await referenceToRecord(branchName);
  if (record) {
    await appendField(ahaReference, "branches", {
      id: branchName,
      name: branchName,
      url: url,
    });
  }
}

async function referenceToRecord(str) {
  const ahaReference = extractReference(str);
  if (!ahaReference) {
    return null;
  }

  const RecordClass = aha.models[ahaReference.type];
  if (!RecordClass) {
    console.log(`Unknown record type ${ahaReference.type}`);
    return null;
  }

  return await RecordClass.select("id", "referenceNum").find(
    ahaReference.referenceNum
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
