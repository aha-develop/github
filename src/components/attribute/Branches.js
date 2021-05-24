import React, { useState } from "react";
import { ExternalLink } from "../ExternalLink";

function Branch({ branch }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(branch.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <aha-flex gap="4px">
      <span className="type-icon">
        <aha-icon icon="fa-regular fa-code-branch type-icon" />
      </span>
      <ExternalLink href={branch.url}>{branch.name}</ExternalLink>
      <a
        href="#"
        onClick={onCopy}
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
}

export function Branches({ fields }) {
  if (!fields.branches || fields.branches.length === 0) return null;

  const branches = (fields.branches || []).map((branch) => (
    <Branch branch={branch} key={branch.name} />
  ));

  return <div className="branches">{branches}</div>;
}
