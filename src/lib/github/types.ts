declare namespace Github {
  type PullRequestReviewDecision =
    | "CHANGES_REQUESTED"
    | "APPROVED"
    | "REVIEW_REQUIRED";

  type StatusState = "EXPECTED" | "ERROR" | "FAILURE" | "SUCCESS" | "PENDING";

  interface PrLabel {
    color: string;
    name: string;
  }

  interface Context {
    context: string;
    description: string;
    targetUrl: string;
    state: StatusState;
  }

  interface CommitStatus {
    statusCheckRollup: { state: StatusState } | null;
    status: { contexts: Context[] } | null;
  }

  interface PrForLink {
    id: number;
    number: number;
    title: string;
    url: string;
    status: string;
    merged: boolean;
    repository: { url: string };
    headRef: { name: string } | null;
  }

  interface PrWithStatus extends PrForLink {
    commits: { nodes: { commit: CommitStatus }[] };
  }

  interface PrForReviewDecision extends PrForLink {
    reviewDecision: PullRequestReviewDecision;
    latestReviews: { nodes: { state: PullRequestReviewDecision }[] };
  }

  interface PrWithLabels extends PrForLink {
    labels: { nodes: PrLabel[] };
  }

  type PrForLinkWithStatus = PrForLink & PrWithStatus;

  type Pr = PrForLink &
    Partial<PrWithStatus & PrForReviewDecision & PrWithLabels>;
}