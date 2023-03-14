import React from "react";
import IconText from "./IconText";
import StatusIcon from "./StatusIcon";
import CardLabel from "./CardLabel";
import { calcTimeElapsed } from "@lib/calcTimeElapsed";
import { isValidExternalLink } from "@lib/isValidExternalLink";
import { IActionWorkflow } from "extension";

export const AttributeWorkflow: React.FC<{
  workflow: IActionWorkflow;
  index: number;
}> = ({ workflow, index }) => {
  const {
    buildNumber,
    buildStatus,
    finishTime,
    commitHash,
    name,
    branch,
    authorName,
    authorURL,
  } = workflow;

  const handleBranchClick = () => {
    if (!isValidExternalLink(workflow?.url)) {
      return;
    }
    window.open(workflow?.url, "_blank", "noopener,noreferrer");
    return;
  };

  return (
    <div>
      <aha-flex direction="column">
        <div style={{ width: "100%" }}>
          <aha-flex
            justify-content="space-between"
            align-items="center"
            gap="8px"
            onClick={() => handleBranchClick()}
            style={{
              padding: "8px 0",
              borderTop:
                index === 0 ? "" : "1px solid var(--theme-light-border)",
            }}
          >
            <IconText
              icon="fa-regular fa-code-branch"
              text={branch?.replace("refs/heads/", "")}
              style={{ flexGrow: 1 }}
              iconStyle={{ color: "#1082d5" }}
            />
            <StatusIcon status={buildStatus} />
            {finishTime && (
              <IconText
                icon="fa-regular fa-clock type-icon"
                text={calcTimeElapsed(finishTime)}
                iconStyle={{ color: "#1082d5" }}
              />
            )}
          </aha-flex>
        </div>
        <aha-tooltip
          type="popover"
          hover-show
          hover-hide
          style={{ width: "100%" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CardLabel title="Name">{name}</CardLabel>
            <CardLabel title="Build #">{buildNumber}</CardLabel>
            <CardLabel title="Commit">{commitHash?.slice(0, 7)}</CardLabel>
            <CardLabel title="Author">
              <>
                {authorURL && (
                  <img
                    src={authorURL}
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "1px solid",
                      borderRadius: "50%",
                      marginRight: "3px",
                    }}
                  />
                )}
                {authorName}
              </>
            </CardLabel>
          </div>
        </aha-tooltip>
      </aha-flex>
    </div>
  );
};
