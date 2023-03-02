import { IDENTIFIER, IPullRequestLink } from "../extension";
import { LinkableRecord } from "./linkableRecord";

/**
 * Append a field/value pair to the given record.
 */
export async function appendField(
  record: LinkableRecord,
  fieldName: string,
  newValue: any
) {
  // Link to Aha! record.
  console.log(
    `Link to ${record.typename}:${record["referenceNum"] || record.uniqueId}`
  );

  await replaceField<any[]>(record, fieldName, (value) => {
    const list: { id: any }[] = [...(value || [])];
    const existing = list.findIndex((item) => item.id == newValue.id);

    if (existing > -1) {
      list.splice(existing, 1, newValue);
    } else {
      list.push(newValue);
    }

    return list;
  });
}

export async function replaceField<T>(
  record: Aha.HasExtensionFields,
  fieldName: string,
  replacer: (value: T | null) => T | Promise<T>
) {
  const fieldValue = await record.getExtensionField(IDENTIFIER, fieldName);
  const newValue = await replacer(fieldValue as T);
  await record.setExtensionField(IDENTIFIER, fieldName, newValue);
}
