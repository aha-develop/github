const refNumMatcher = /([A-Z][A-Z0-9]*-(([E]|[0-9]+)-)?[0-9]+)/;

/**
 * Given a list of PRs, load the corresponding features if they exist
 */
export async function loadRelatedFeatures(prs: Github.PrForLink[]) {
  const refNums: string[] = [];
  const prsByRefNum: Record<string, Github.PrForLink> = {};

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

  const prRecords: Record<string, Aha.Feature> = {};

  for (let feature of features) {
    const pr = prsByRefNum[feature.referenceNum];
    if (!pr) continue;
    prRecords[pr.number] = feature;
  }

  return prRecords;
}
