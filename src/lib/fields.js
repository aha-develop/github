const identifier = "aha-develop.github";

// Append a field/value pair to the given record. Returns an actual record
// instance if one existed.
async function appendField(record, fieldName, newValue) {
  console.log(record);
  // Link to Aha! record.
  console.log(`Link to ${record.typename}:${record.referenceNum}`);

  await replaceField(record, fieldName, (value) => {
    /** @type {{id:any}[]} */
    const list = [...(value || [])];
    const existing = list.findIndex((item) => item.id == newValue.id);

    if (existing > -1) {
      list.splice(existing, 1, newValue);
    } else {
      list.push(newValue);
    }

    return list;
  });
}

async function replaceField(record, fieldName, replacer) {
  const fieldValue = await record.getExtensionField(identifier, fieldName);
  const newValue = await replacer(fieldValue);
  await record.setExtensionField(identifier, fieldName, newValue);
}

function accountPrId(number, ref) {
  return [number, ref].join("");
}

async function linkPullRequest(pr) {
  const record = await referenceToRecord(pr.title);
  if (record) {
    await appendField(record, "pullRequests", {
      id: pr.number,
      name: pr.title,
      url: pr.html_url || pr.url,
      state: pr.merged ? "merged" : pr.state,
    });

    await appendField(aha.account, "pullRequests", {
      id: accountPrId(pr.number, record.referenceNum),
      prNumber: pr.number,
      ahaReference: [record.typename, record.referenceNum],
    });
  }

  return record;
}

async function unlinkPullRequest(record, number) {
  await replaceField(record, "pullRequests", (prs) => {
    if (prs) {
      return prs.filter((pr) => pr.id != number);
    } else {
      return [];
    }
  });

  await replaceField(aha.account, "pullRequests", (prs) => {
    if (prs) {
      return prs.filter(
        (pr) => pr.id == accountPrId(number, record.referenceNum)
      );
    } else {
      return [];
    }
  });
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

export {
  appendField,
  linkPullRequest,
  unlinkPullRequest,
  linkBranch,
};
