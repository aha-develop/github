import React, { useMemo, useCallback } from "react";
import { IActionProject, IActionWorkflow } from "extension";
import { AttributeWorkflow } from "./AttributeWorkflow";

export type AttributeWorkflowsProps = {
  project?: IActionProject;
  workflows?: IActionWorkflow[];
};

const AttributeWorkflows = ({ workflows = [] }: AttributeWorkflowsProps) => {
  const sortedWorkflows = useMemo(
    () =>
      workflows.sort(
        (a, b) =>
          new Date(b.finishTime || 0).getTime() -
          new Date(a.finishTime || 0).getTime()
      ),
    [workflows]
  );

  const workflowElements = sortedWorkflows.map((workflow, index) => (
    <AttributeWorkflow workflow={workflow} index={index} />
  ));

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "8px 0",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {workflowElements}
    </div>
  );
};

export default AttributeWorkflows;
