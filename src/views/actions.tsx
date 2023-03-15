import Attribute from "@components/Actions/Attribute";
import { isLinkableRecord, LinkableRecord } from "@lib/linkableRecord";
import { IRecordExtensionFields } from "extension";
import React from "react";

aha.on(
  "githubActionsAttribute",
  ({ record, fields, onUnmounted }, { identifier, settings }) => {
    if (!isLinkableRecord(record)) return;

    return (
      <Attribute
        fields={fields as IRecordExtensionFields}
        record={record as LinkableRecord}
      />
    );
  }
);
