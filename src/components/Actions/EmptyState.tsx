import { LinkableRecord } from "@lib/linkableRecord";
import React, { memo } from "react";

const EmptyState: React.FC<{ record: LinkableRecord }> = ({ record }) => (
  <aha-flex
    direction="row"
    gap="8px"
    justify-content="start"
    style={{ padding: "2px 5px", color: "var(--theme-tertiary-text)" }}
  >
    <aha-icon icon="fa-regular fa-code-branch type-icon" />
    <span>
      Include <strong>{record.referenceNum}</strong> in your branch name or
      commit message
    </span>
  </aha-flex>
);

export default memo(EmptyState);
