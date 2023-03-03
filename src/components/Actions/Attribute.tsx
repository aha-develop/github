import { LinkableRecord } from "@lib/linkableRecord";
import { IRecordExtensionFields } from "extension";
import React, { useMemo } from "react";
import AttributeProject from "./AttributeProject";
import AttributeWorkflows from "./AttributeWorkflows";
import EmptyState from "./EmptyState";

export type AttributeProps = {
  record: LinkableRecord;
  fields: IRecordExtensionFields;
};

const Attribute = ({ fields, record }: AttributeProps) => {
  const actions = fields.actions || {};

  const hasWorkflows = useMemo(
    () => Object.keys(actions ?? {}).length > 0,
    [actions]
  );

  const useableFields = Object.values(actions);
  const workflows =
    hasWorkflows &&
    useableFields
      .filter((field) => field.project)
      .map((field, index) => {
        if (!field.project) return;

        return (
          <div key={index}>
            <AttributeProject project={field.project} />
            <AttributeWorkflows
              workflows={Object.values(field?.workflows ?? [])}
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
