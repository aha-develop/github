import { ExternalLink } from "@components/ExternalLink";
import { GithubActions } from "@lib/actions/githubActions";
import React, { memo } from "react";

export type AttributeProjectProps = {
  project: GithubActions.IActionProject;
};

const AttributeProject: React.FC<AttributeProjectProps> = ({ project }) => {
  if (!project?.url) {
    return null;
  }
  return (
    <aha-flex>
      <ExternalLink href={project.url}>
        <span className="type-icon">
          <aha-icon icon="fa-solid fa-bookmark type-icon" />
          <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
            {project?.name}
          </span>
        </span>
      </ExternalLink>
    </aha-flex>
  );
};

export default memo(AttributeProject);
