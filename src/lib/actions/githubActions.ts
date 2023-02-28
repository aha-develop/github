export  namespace GithubActions {
  export interface IProject {
    id?: string;
    name?: string;
    url?: string;
  }

  export interface IActionFields {
    [index: string]: IActionField;
  }

  export interface IActionField {
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

  export interface IActionWorkflow {
    id: number;
    url?: string;
    buildNumber?: string;
    buildStatus?: GithubActions.IWorkflowConclusion;
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

  type IWorkflowAction = "requested" | "completed";

  type IWorkflowRunStatus = "queued" | "in_progress" | "completed";

  export type IWorkflowConclusion =
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "success"
    | "skipped"
    | "stale"
    | "timed_out";

  interface IWebhookPayload {
    action?: IWorkflowAction;
    workflow_run?: IWorkflowRun;
    workflow?: IWorkflow;
    organization?: IOrganization;
    repository?: IRepository;
    sender?: ISender;
  }

  interface ISender {
    id?: number;
    avatar_url?: string;
    events_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    gravatar_id?: string;
    html_url?: string;
    login?: string;
    node_id?: string;
    organizations_url?: string;
    received_events_url?: string;
    repos_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    type?: string;
    url?: string;
    site_admin: boolean;
  }

  interface IOrganization {
    id?: number;
    avatar_url?: string;
    description?: string;
    events_url?: string;
    hooks_url?: string;
    issues_url?: string;
    login?: string;
    members_url?: string;
    node_id?: string;
    public_members_url?: string;
    repos_url?: string;
    url?: string;
  }

  export interface IWorkflow {
    id?: number;
    name?: string;
    badge_url?: string;
    created_at?: string;
    html_url?: string;
    node_id?: string;
    path?: string;
    state?: string;
    updated_at?: string;
    url?: string;
  }

  interface IAuthor {
    id?: number;
    avatar_url?: string;
    events_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    gravatar_id?: string;
    html_url?: string;
    login?: string;
    node_id?: string;
    organizations_url?: string;
    received_events_url?: string;
    repos_url?: string;
    site_admin?: boolean;
    starred_url?: string;
    subscriptions_url?: string;
    type?: string;
    url?: string;
  }

  interface IRepository {
    archive_url?: string;
    assignees_url?: string;
    blobs_url?: string;
    branches_url?: string;
    collaborators_url?: string;
    comments_url?: string;
    commits_url?: string;
    compare_url?: string;
    contents_url?: string;
    contributors_url?: string;
    deployments_url?: string;
    description?: string;
    downloads_url?: string;
    events_url?: string;
    fork?: boolean;
    forks_url?: string;
    full_name?: string;
    git_commits_url?: string;
    git_refs_url?: string;
    git_tags_url?: string;
    hooks_url?: string;
    html_url?: string;
    id?: number;
    issue_comment_url?: string;
    issue_events_url?: string;
    issues_url?: string;
    keys_url?: string;
    labels_url?: string;
    languages_url?: string;
    merges_url?: string;
    milestones_url?: string;
    name?: string;
    node_id?: string;
    notifications_url?: string;
    owner?: IAuthor;
    private?: boolean;
    pulls_url?: string;
    releases_url?: string;
    stargazers_url?: string;
    statuses_url?: string;
    subscribers_url?: string;
    subscription_url?: string;
    tags_url?: string;
    teams_url?: string;
    trees_url?: string;
    url?: string;
  }

  interface ICommit {
    author: {
      email?: string;
      name?: string;
    };
    committer: {
      email?: string;
      name?: string;
    };
    id?: string;
    message?: string;
    timestamp?: string;
    tree_id?: string;
  }

  interface IWorkflowRun {
    artifacts_url?: string;
    cancel_url?: string;
    check_suite_id?: number;
    check_suite_node_id?: string;
    check_suite_url?: string;
    conclusion?: IWorkflowConclusion;
    created_at?: string;
    event?: string;
    head_branch?: string;
    head_commit?: ICommit;
    head_repository?: IRepository;
    head_sha?: string;
    html_url?: string;
    id?: number;
    jobs_url?: string;
    logs_url?: string;
    name?: string;
    node_id?: string;
    previous_attempt_url?: string;
    pull_requests: any[];
    repository: IRepository;
    rerun_url?: string;
    run_attempt?: number;
    run_number?: number;
    run_started_at?: string;
    status: IWorkflowRunStatus;
    updated_at?: string;
    url?: string;
    workflow_id?: number;
    workflow_url?: string;
    actor?: IAuthor;
  }
}
