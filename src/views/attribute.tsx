import React from "react";
import { Attribute } from "@components/attribute/Attribute";
import { ExtensionRoot } from "@components/ExtensionRoot";
import { LinkableRecord } from "@lib/linkableRecord";

const links: Aha.RenderExtension = ({ record, fields }) => {
  return (
    <ExtensionRoot>
      <Attribute
        fields={fields as Github.IRecordExtensionFields}
        record={record as unknown as LinkableRecord}
      />
    </ExtensionRoot>
  );
};

aha.on("links", links);
