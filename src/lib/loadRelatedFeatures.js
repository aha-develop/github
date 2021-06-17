const refNumMatcher = /([A-Z][A-Z0-9]*-(([E]|[0-9]+)-)?[0-9]+)/;

/**
 * Given a list of PRs, load the corresponding features if they exist
 *
 * @param {import('./github').PrForLink[]} prs
 */
export async function loadRelatedFeatures(prs) {
  const refNums = [];
  const prsByRefNum = {};

  for (let pr of prs) {
    [pr.headRef?.name.toUpperCase(), pr.title]
      .map(String)
      .map((s) => refNumMatcher.exec(s))
      .forEach((match) => {
        if (match) {
          refNums.push(match[0]);
          prsByRefNum[match[0]] = pr;
        }
      });
  }

  if (refNums.length === 0) {
    // No records to find
    return {};
  }

  const features = await aha.models.Feature.select(
    "id",
    "referenceNum",
    "name",
    "path"
  )
    .where({
      id: refNums,
    })
    .all();

  /** @type {{[index:string]: Aha.Feature}} */
  const prRecords = {};

  for (let feature of features) {
    const pr = prsByRefNum[feature.referenceNum];
    if (!pr) continue;
    prRecords[pr.number] = feature;
  }

  return prRecords;
}
