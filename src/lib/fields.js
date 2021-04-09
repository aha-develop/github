const IDENTIFIER = "aha-develop.github";
const PULL_REQUESTS_FIELD = "pullRequests";

/**
 * @typedef PrLink
 * @prop {number} id
 * @prop {string} name
 * @prop {string} url
 * @prop {string} state
 */

/**
 * @typedef AccountPr
 * @prop {string} id
 * @prop {number} number
 * @prop {[string, string]} ahaReference
 */

/**
 * Append a field/value pair to the given record. Returns an actual record
 * instance if one existed.
 *
 * @param {Aha.RecordStub} record
 * @param {string} fieldName
 * @param {*} newValue
 */
async function appendField(record, fieldName, newValue) {
  console.log(record);
  // Link to Aha! record.
  console.log(`Link to ${record.typename}:${record.referenceNum || record.id}`);

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

/**
 * @template T
 * @param {Aha.ApplicationModel} record
 * @param {string} fieldName
 * @param {((value: T|null) => T | Promise<T>)} replacer
 */
async function replaceField(record, fieldName, replacer) {
  const fieldValue = await record.getExtensionField(IDENTIFIER, fieldName);
  const newValue = await replacer(fieldValue);
  await record.setExtensionField(IDENTIFIER, fieldName, newValue);
}

/**
 * @param {number} number
 * @param {string} ref
 */
function accountPrId(number, ref) {
  return [number, ref].join("");
}

/**
 * @param {*} pr
 * @returns {PrLink}
 */
function githubPrToPrLink(pr) {
  return {
    id: pr.number,
    name: pr.title,
    url: pr.html_url || pr.url,
    state: pr.merged ? "merged" : pr.state,
  };
}

async function linkPullRequestToRecord(pr, record) {
  await appendField(record, PULL_REQUESTS_FIELD, githubPrToPrLink(pr));

  await appendField(aha.account, PULL_REQUESTS_FIELD, {
    id: accountPrId(pr.number, record.referenceNum),
    prNumber: pr.number,
    ahaReference: [record.typename, record.referenceNum],
  });
}

async function linkPullRequest(pr) {
  const record = await referenceToRecord(pr.title);

  if (record) {
    await linkPullRequestToRecord(pr, record);
  }

  return record;
}

async function unlinkPullRequest(record, number) {
  await replaceField(record, PULL_REQUESTS_FIELD, (prs) => {
    if (prs) {
      return prs.filter((pr) => pr.id != number);
    } else {
      return [];
    }
  });

  await replaceField(aha.account, PULL_REQUESTS_FIELD, (prs) => {
    if (prs) {
      return prs.filter(
        (pr) => pr.id == accountPrId(number, record.referenceNum)
      );
    } else {
      return [];
    }
  });
}

/**
 * @param {Aha.RecordStub} record
 */
async function unlinkPullRequests(record) {
  /** @type {PrLink[]} */
  const prs =
    (await record.getExtensionField(IDENTIFIER, PULL_REQUESTS_FIELD)) || [];
  const ids = prs.map((pr) => accountPrId(pr.id, record.referenceNum));

  await replaceField(aha.account, PULL_REQUESTS_FIELD, (
    /** @type {AccountPr[]} */ accountPrs
  ) => {
    if (!accountPrs) return [];
    return accountPrs.filter((accountPr) => !ids.includes(accountPr.id));
  });

  await record.setExtensionField(IDENTIFIER, PULL_REQUESTS_FIELD, []);
}

export async function allPrs() {
  const prs = await aha.account.getExtensionField(
    IDENTIFIER,
    PULL_REQUESTS_FIELD
  );
  return prs || [];
}

async function linkBranch(branchName, url) {
  const record = await referenceToRecord(branchName);
  if (record) {
    await appendField(record, "branches", {
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
  linkPullRequestToRecord,
  unlinkPullRequest,
  unlinkPullRequests,
  linkBranch,
  githubPrToPrLink
};
