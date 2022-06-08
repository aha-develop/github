import { IDENTIFIER } from "../extension";

const PULL_REQUESTS_FIELD = "pullRequests";
const BRANCHES_FIELD = "branches";

/**
 * @typedef {Aha.ReferenceInterface & Aha.HasExtensionFields} LinkableRecord
 */

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
 * Append a field/value pair to the given record.
 *
 * @param {Aha.ApplicationModel & Aha.HasExtensionFields} record
 * @param {string} fieldName
 * @param {*} newValue
 */
async function appendField(record, fieldName, newValue) {
  // Link to Aha! record.
  console.log(
    `Link to ${record.typename}:${record["referenceNum"] || record.uniqueId}`
  );

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
 * @param {Aha.HasExtensionFields} record
 * @param {string} fieldName
 * @param {((value: T|null) => T | Promise<T>)} replacer
 */
async function replaceField(record, fieldName, replacer) {
  const fieldValue = await record.getExtensionField(IDENTIFIER, fieldName);
  const newValue = await replacer(fieldValue);
  await record.setExtensionField(IDENTIFIER, fieldName, newValue);
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

/**
 * @param {Github.PrForLink} pr
 * @param {LinkableRecord} record
 */
async function linkPullRequestToRecord(pr, record) {
  await appendField(record, PULL_REQUESTS_FIELD, githubPrToPrLink(pr));

  if (pr.headRef) {
    await linkBranchToRecord(pr.headRef.name, pr.repository.url, record);
  }
}

/**
 * @param {Github.PrForLink} pr
 */
async function linkPullRequest(pr) {
  const record = await referenceToRecord(pr.title);

  if (record) {
    await linkPullRequestToRecord(pr, record);
  }

  return record;
}

/**
 * @param {LinkableRecord} record
 * @param {*} number
 */
async function unlinkPullRequest(record, number) {
  await replaceField(record, PULL_REQUESTS_FIELD, (prs) => {
    if (prs) {
      return prs.filter((pr) => pr.id != number);
    } else {
      return [];
    }
  });
}

/**
 * @param {Aha.ReferenceInterface & Aha.HasExtensionFields} record
 */
async function unlinkPullRequests(record) {
  await record.setExtensionField(IDENTIFIER, PULL_REQUESTS_FIELD, []);
}

/**
 * @param {LinkableRecord} record
 * @param {string} branchName
 * @param {string} repoUrl
 */
async function linkBranchToRecord(branchName, repoUrl, record) {
  await appendField(record, BRANCHES_FIELD, {
    id: branchName,
    name: branchName,
    url: `${repoUrl}/tree/${branchName}`,
  });
}

/**
 * @param {string} branchName
 * @param {string} repoUrl
 */
async function linkBranch(branchName, repoUrl) {
  const record = await referenceToRecord(branchName);
  if (record) {
    await linkBranchToRecord(branchName, repoUrl, record);
    return record;
  }
}

/**
 * @param {Aha.HasExtensionFields} record
 */
async function unlinkBranches(record) {
  await record.setExtensionField(IDENTIFIER, BRANCHES_FIELD, []);
}

/**
 * @param {string} str
 * @returns {Promise<(Aha.HasExtensionFields & Aha.ReferenceInterface)|null>}
 */
export async function referenceToRecord(str) {
  const ahaReference = extractReference(str);
  if (!ahaReference) {
    return null;
  }
  console.log(
    `Searching for ${ahaReference.type} ref ${ahaReference.referenceNum}`
  );

  const RecordClass = aha.models[ahaReference.type];
  if (!RecordClass) {
    console.log(`Unknown record type ${ahaReference.type}`);
    return null;
  }

  return await RecordClass.select("id", "referenceNum").find(
    ahaReference.referenceNum
  );
}

/**
 * @param {string} name
 */
function extractReference(name) {
  let matches;

  // Requirement
  if ((matches = name.match(/[a-z][a-z0-9]{1,9}-[0-9]+-[0-9]+/i))) {
    return {
      type: "Requirement",
      referenceNum: matches[0],
    };
  }
  // Epic
  if ((matches = name.match(/[a-z][a-z0-9]{1,9}-E-[0-9]+/i))) {
    return {
      type: "Epic",
      referenceNum: matches[0],
    };
  }
  // Feature
  if ((matches = name.match(/[a-z][a-z0-9]{1,9}-[0-9]+/i))) {
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
  unlinkBranches,
  githubPrToPrLink,
};
