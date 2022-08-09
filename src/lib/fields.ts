import { IDENTIFIER } from "../extension";

const PULL_REQUESTS_FIELD = "pullRequests";
const BRANCHES_FIELD = "branches";

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
async function updatePullRequestLinkOnRecord(pr, record) {
  const prLink = githubPrToPrLink(pr);

  console.debug(
    `Updating PR #${pr.number} on ${record.typename} ${record.referenceNum}`
  );

  await appendField(record, PULL_REQUESTS_FIELD, prLink);
  await aha.account.setExtensionField(IDENTIFIER, pr.url, record.referenceNum);

  if (pr.headRef) {
    await linkBranchToRecord(pr.headRef.name, pr.repository.url, record);
  }
}

/**
 * @param {Github.PrForLink} pr
 */
async function getOrLinkPullRequestRecord(pr) {
  let record =
    (await referenceFromPr(pr)) || (await referenceToRecord(pr.title));

  if (record) {
    // Always update the PR info on the record
    await updatePullRequestLinkOnRecord(pr, record);
  }

  return record;
}

/**
 * @param {LinkableRecord} record
 * @param {*} number
 */
async function unlinkPullRequest(record, number) {
  /** @type {null|Github.PrForLink[]} */
  const prs = await record.getExtensionField(IDENTIFIER, PULL_REQUESTS_FIELD);
  const pr = prs?.find((pr) => pr.id === number);
  await record.setExtensionField(
    IDENTIFIER,
    PULL_REQUESTS_FIELD,
    prs?.filter((pr) => pr.id != number) || []
  );

  if (pr) {
    await aha.account.clearExtensionField(IDENTIFIER, pr.url);
  }
}

/**
 * @param {Aha.ReferenceInterface & Aha.HasExtensionFields} record
 */
async function unlinkPullRequests(record) {
  /** @type {null|Github.PrForLink[]} */
  const prs = await record.getExtensionField(IDENTIFIER, PULL_REQUESTS_FIELD);
  if (prs) {
    for (let pr of prs) {
      await aha.account.clearExtensionField(IDENTIFIER, pr.url);
    }
  }

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
 * @returns {Promise<(LinkableRecord)|null>}
 */
export async function referenceToRecord(str) {
  const ahaReference = extractReferenceFromName(str);
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
 * @param {Github.PrForLink | PrLink} pr
 */
export async function referenceFromPr(pr) {
  const prLink = githubPrToPrLink(pr);
  const ref = await aha.account.getExtensionField(IDENTIFIER, prLink.url);
  if (!ref) return null;

  return referenceToRecord(ref);
}

/**
 * @param {string} name
 */
function extractReferenceFromName(name) {
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
  getOrLinkPullRequestRecord as linkPullRequest,
  updatePullRequestLinkOnRecord as linkPullRequestToRecord,
  unlinkPullRequest,
  unlinkPullRequests,
  linkBranch,
  unlinkBranches,
  githubPrToPrLink,
};
