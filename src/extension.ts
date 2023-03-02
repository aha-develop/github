export const IDENTIFIER = "aha-develop.github";
export const ACTIONS_IDENTIFIER = "aha-develop.github-actions";

export const LEARN_MORE_URL =
  "https://www.aha.io/support/develop/integrations/github/github-extension";
export const ICON = aha.iconForExtensionIdentifier(IDENTIFIER);

export interface IRecordExtensionFields {
  branches?: IBranchLink[];
  pullRequests?: IPullRequestLink[];
  actions?: Record<string, IActionLink>;
}

export interface IPullRequestLink {
  id: number;
  name: string;
  url: string;
  state: "open" | "closed" | "merged";
  labels?: IPullRequestLinkLabel[];
}

export interface IPullRequestLinkLabel {
  name: string;
  color: string;
}

export interface IBranchLink {
  id: string;
  name: string;
  url: string;
}

export interface IActionLink {
  project?: IActionProject;
  workflows?: {
    [index: string]: IActionWorkflow;
  };
}

export interface IActionProject {
  id?: string;
  name?: string;
  url?: string;
}

export type ActionWorkflowConclusion =
  | "action_required"
  | "cancelled"
  | "failure"
  | "neutral"
  | "success"
  | "skipped"
  | "stale"
  | "timed_out";

export interface IActionWorkflow {
  id: number;
  url?: string;
  buildNumber?: string;
  buildStatus?: ActionWorkflowConclusion;
  startTime?: string;
  finishTime?: string;
  name?: string;
  commitHash?: string;
  commitMsg?: string;
  branch?: string;
  workflow?: string;
  authorName?: string;
  authorURL?: string;
}
