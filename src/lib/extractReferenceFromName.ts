/**
 * Given a string, find in that string an Aha! reference number and return the
 * reference number and the type of record it refers to.
 */
export function extractReferenceFromName(
  name: string
): null | { type: "Requirement" | "Epic" | "Feature"; referenceNum: string; } {
  let matches;

  // Requirement
  if ((matches = name.match(/[a-z][a-z0-9]{0,9}-[0-9]+-[0-9]+/i))) {
    return {
      type: "Requirement",
      referenceNum: matches[0],
    };
  }
  // Epic
  if ((matches = name.match(/[a-z][a-z0-9]{0,9}-E-[0-9]+/i))) {
    return {
      type: "Epic",
      referenceNum: matches[0],
    };
  }
  // Feature
  if ((matches = name.match(/[a-z][a-z0-9]{0,9}-[0-9]+/i))) {
    return {
      type: "Feature",
      referenceNum: matches[0],
    };
  }

  return null;
}
