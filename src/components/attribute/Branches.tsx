import { useClipboard } from "@lib/useClipboard";
import { IBranchLink, IRecordExtensionFields } from "extension";
import React from "react";
import { ExternalLink } from "../ExternalLink";

const Branch: React.FC<{ branch: IBranchLink }> = ({ branch }) => {
  const [onCopy, copied] = useClipboard();

  return (
    <aha-flex gap="4px">
      <span className="type-icon">
        <aha-icon icon="fa-regular fa-code-branch type-icon" />
      </span>
      <ExternalLink href={branch.url}>{branch.name}</ExternalLink>
      <a
        href="#"
        onClick={() => onCopy(branch.name)}
        style={{
          color: copied ? "var(--aha-green-600)" : "",
        }}
      >
        <aha-icon
          icon={"fa-regular fa-" + (copied ? "check" : "clipboard")}
        ></aha-icon>
      </a>
    </aha-flex>
  );
};

export const Branches: React.FC<{
  fields: IRecordExtensionFields;
}> = ({ fields }) => {
  if (!fields.branches || fields.branches.length === 0) return null;

  const branches = (fields.branches || []).map((branch) => (
    <Branch branch={branch} key={branch.name} />
  ));

  return <div className="branches">{branches}</div>;
};
