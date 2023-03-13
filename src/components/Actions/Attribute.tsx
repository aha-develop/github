import { LinkableRecord } from "@lib/linkableRecord";
import { IActionLink, IRecordExtensionFields } from "extension";
import React, { useMemo } from "react";
import AttributeProject from "./AttributeProject";
import AttributeWorkflows from "./AttributeWorkflows";
import { EmptyState } from "./EmptyState";

export type AttributeProps = {
  record: LinkableRecord;
  fields: IRecordExtensionFields;
};

const Attribute = ({ fields, record }: AttributeProps) => {
  const actionFields = useMemo(
    () =>
      Object.entries(fields).reduce((acc, [key, value]) => {
        if (key.startsWith("action_")) {
          return { ...acc, [key]: value };
        } else {
          return acc;
        }
      }, {} as Record<string, IActionLink>),
    [fields]
  );

  const hasWorkflows = useMemo(
    () => Object.keys(actionFields ?? {}).length > 0,
    [actionFields]
  );

  const useableFields = Object.values(actionFields);
  const workflows =
    hasWorkflows &&
    useableFields
      .filter((field) => field.project)
      .map((field, index) => {
        if (!field.project) return null;

        return (
          <div key={index}>
            <AttributeProject project={field.project} />
            <AttributeWorkflows
              workflows={Object.values(field.workflows ?? {})}
              project={field.project}
            />
          </div>
        );
      });

  return (
    <aha-flex
      align-items="left"
      direction="column"
      gap="5px"
      style={{ padding: "0 5px" }}
    >
      {hasWorkflows ? <>{workflows}</> : <EmptyState record={record} />}
    </aha-flex>
  );
};

export default Attribute;
