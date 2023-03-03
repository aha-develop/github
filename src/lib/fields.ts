import { IDENTIFIER, IPullRequestLink } from "../extension";
import { LinkableRecord } from "./linkableRecord";

/**
 * Append a field/value pair to the given record. The new value must have an id field.
 */
export async function appendField<V extends { id: string | number }>(
  record: LinkableRecord,
  fieldName: string,
  newValue: V
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

/**
 * Replace the contents of an extension field. The callback receives the old
 * value and must return the new value.
 */
export async function replaceField<T>(
  record: Aha.HasExtensionFields,
  fieldName: string,
  replacer: (value: T | null) => T | Promise<T>
) {
  const fieldValue = await record.getExtensionField(IDENTIFIER, fieldName);
  const newValue = await replacer(fieldValue as T);
  await record.setExtensionField(IDENTIFIER, fieldName, newValue);
}
