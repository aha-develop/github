import React, { useMemo, useCallback } from "react";
import IconText from "./IconText";
import StatusIcon from "./StatusIcon";
import CardLabel from "./CardLabel";
import { GithubActions } from "@lib/actions/githubActions";
import { calcTimeElapsed } from "@lib/calcTimeElapsed";
import { isValidExternalLink } from "@lib/isValidExternalLink";

export type AttributeWorkflowsProps = {
  project?: GithubActions.IProject;
  workflows?: GithubActions.IActionWorkflow[];
};

const AttributeWorkflows = ({
  workflows = [],
  project,
}: AttributeWorkflowsProps) => {
  const sortedWorkflows = useMemo(
    () =>
      workflows.sort(
        (a, b) =>
          new Date(b.finishTime || 0).getTime() -
          new Date(a.finishTime || 0).getTime()
      ),
    [workflows]
  );

  const handleBranchClick = useCallback(
    (workflow: GithubActions.IWorkflow) => {
      if (!isValidExternalLink(workflow?.url)) {
        return;
      }
      window.open(workflow?.url, "_blank", "noopener,noreferrer");
      return;
    },
    [project]
  );

  const renderWorkflow = (
    workflow: GithubActions.IActionWorkflow,
    index: number
  ) => {
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
    return (
      <aha-tooltip
        type="popover"
        hover-show
        hover-hide
        style={{ width: "100%" }}
      >
        <div slot="trigger" style={{ width: "100%" }}>
          <aha-flex
            justify-content="space-between"
            align-items="center"
            gap="8px"
            onClick={() => handleBranchClick(workflow)}
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
        <aha-flex direction="column">
          <CardLabel title="Name" value={name} />
          <CardLabel title="Build #" value={buildNumber} />
          <CardLabel title="Commit" value={commitHash?.slice(0, 7)} />
          <CardLabel
            title="Author"
            value={
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
            }
          />
        </aha-flex>
      </aha-tooltip>
    );
  };

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "8px 0",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {sortedWorkflows.map(renderWorkflow)}
    </div>
  );
};

export default AttributeWorkflows;
