export type LinkableRecord = Aha.ReferenceInterface & Aha.HasExtensionFields;

export function isLinkableRecord(
  record: Aha.ApplicationModel
): record is LinkableRecord {
  return "getExtensionField" in record;
}
