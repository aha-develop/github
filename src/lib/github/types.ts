import { GithubActions } from "@lib/actions/githubActions";

export namespace GithubExtension {
  export interface BranchLink {
    id: string;
    name: string;
    url: string;
  }

  export interface IRecordExtensionFields {
    branches?: BranchLink[];
    pullRequests?: PrLink[];
    actions?: GithubActions.IActionFields;
  }

  export type PullRequestReviewDecision =
    | "CHANGES_REQUESTED"
    | "APPROVED"
    | "REVIEW_REQUIRED";

  export type StatusState =
    | "EXPECTED"
    | "ERROR"
    | "FAILURE"
    | "SUCCESS"
    | "PENDING";

  export interface PrLabel {
    color: string;
    name: string;
  }

  export interface Context {
    context: string;
    description: string;
    targetUrl: string;
    state: StatusState;
    avatarUrl?: string;
  }

  export interface CommitStatus {
    statusCheckRollup: { state: StatusState } | null;
    status: { contexts: Context[] } | null;
  }

  export type PrState =
    | "open"
    | "merged"
    | "closed"
    | "OPEN"
    | "MERGED"
    | "CLOSED";

  export interface PrLink {
    id: number;
    name: string;
    url: string;
    state: PrState;
  }

  export interface PrForLink {
    id: number;
    number: number;
    title: string;
    url: string;
    // status: string;
    state: PrState;
    merged: boolean;
    repository: { url: string };
    headRef: { name: string } | null;
  }

  export interface PrWithStatus extends PrForLink {
    commits: { nodes: { commit: CommitStatus }[] };
  }

  export function isPrWithStatus(pr: PrForLink): pr is PrWithStatus {
    return "commits" in pr && "nodes" in (pr.commits as any);
  }

  export interface PrForReviewDecision extends PrForLink {
    reviewDecision: PullRequestReviewDecision;
    latestReviews: { nodes: { state: PullRequestReviewDecision }[] };
  }

  export interface PrWithLabels extends PrForLink {
    labels: { nodes: PrLabel[] };
  }

  export type PrForLinkWithStatus = PrForLink & PrWithStatus;

  export type Pr = PrForLink &
    Partial<PrWithStatus & PrForReviewDecision & PrWithLabels>;
}
