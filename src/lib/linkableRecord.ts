export type LinkableRecord = Aha.ReferenceInterface & Aha.HasExtensionFields;

export function isLinkableRecord(record: any): record is LinkableRecord {
  return "getExtensionField" in record;
}
