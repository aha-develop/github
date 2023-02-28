import React from "react";
import Attribute from "@components/Actions/Attribute";
import { GithubExtension } from "@lib/github/types";
import { isLinkableRecord, LinkableRecord } from "@lib/linkableRecord";

aha.on(
  "githubActionsAttribute",
  ({ record, fields, onUnmounted }, { identifier, settings }) => {
    if (!isLinkableRecord(record)) return;

    return (
      <Attribute
        fields={fields as GithubExtension.IRecordExtensionFields}
        record={record as LinkableRecord}
      />
    );
  }
);
