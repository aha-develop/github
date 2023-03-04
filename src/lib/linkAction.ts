import { IActionLink, IDENTIFIER } from "extension";
import { LinkableRecord } from "./linkableRecord";

/**
 * Save Github Actions in Record Field
 */
export const saveActionInRecord = async (
  record: LinkableRecord,
  githubAction: IActionLink
): Promise<void> => {
  const projectId = githubAction.project?.id;
  if (!projectId) {
    throw new Error("Undefined Project Id");
  }

  // If Old Github actions exist, add or replace workflows
  const oldAction = await record.getExtensionField<IActionLink>(
    IDENTIFIER,
    projectId
  );

  if (oldAction) {
    githubAction = {
      ...oldAction,
      project: {
        ...(oldAction?.project ?? {}),
        ...(githubAction?.project ?? {}),
      },
      workflows: {
        ...(oldAction?.workflows ?? {}),
        ...(githubAction?.workflows ?? {}),
      },
    };
  }

  await record.setExtensionField(
    IDENTIFIER,
    `action_${projectId}`,
    githubAction
  );
};
