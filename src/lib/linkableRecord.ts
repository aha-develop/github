export type LinkableRecord = Aha.ReferenceInterface & Aha.HasExtensionFields;

/**
 * Ensure given record supports extension fields
 */
export function isLinkableRecord(record: any): record is LinkableRecord {
  return "getExtensionField" in record;
}
