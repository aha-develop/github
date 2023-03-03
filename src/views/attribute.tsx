import { Attribute } from "@components/attribute/Attribute";
import { ExtensionRoot } from "@components/ExtensionRoot";
import { LinkableRecord } from "@lib/linkableRecord";
import { IRecordExtensionFields } from "extension";
import React from "react";

const links: Aha.RenderExtension = ({ record, fields }) => {
  return (
    <ExtensionRoot>
      <Attribute
        fields={fields as IRecordExtensionFields}
        record={record as unknown as LinkableRecord}
      />
    </ExtensionRoot>
  );
};

aha.on("links", links);
