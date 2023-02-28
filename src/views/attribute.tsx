import React from "react";
import { Attribute } from "@components/attribute/Attribute";
import { ExtensionRoot } from "@components/ExtensionRoot";
import { LinkableRecord } from "@lib/linkableRecord";
import { GithubExtension } from "@lib/github/types";

const links: Aha.RenderExtension = ({ record, fields }) => {
  return (
    <ExtensionRoot>
      <Attribute
        fields={fields as GithubExtension.IRecordExtensionFields}
        record={record as unknown as LinkableRecord}
      />
    </ExtensionRoot>
  );
};

aha.on("links", links);
