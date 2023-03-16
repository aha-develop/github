import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Base64String: any;
  Date: any;
  DateTime: any;
  GitObjectID: any;
  GitSSHRemote: any;
  GitTimestamp: any;
  HTML: any;
  PreciseDateTime: any;
  URI: any;
  X509Certificate: any;
};

export type AbortQueuedMigrationsInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
};

export type AcceptEnterpriseAdministratorInvitationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  invitationId: Scalars['ID'];
};

export type AcceptTopicSuggestionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  repositoryId: Scalars['ID'];
};

export type ActorType =
  | 'TEAM'
  | 'USER';

export type AddAssigneesToAssignableInput = {
  assignableId: Scalars['ID'];
  assigneeIds: Array<Scalars['ID']>;
  clientMutationId: InputMaybe<Scalars['String']>;
};

export type AddCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  subjectId: Scalars['ID'];
};

export type AddDiscussionCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  discussionId: Scalars['ID'];
  replyToId: InputMaybe<Scalars['ID']>;
};

export type AddDiscussionPollVoteInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pollOptionId: Scalars['ID'];
};

export type AddEnterpriseOrganizationMemberInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  organizationId: Scalars['ID'];
  role: InputMaybe<OrganizationMemberRole>;
  userIds: Array<Scalars['ID']>;
};

export type AddEnterpriseSupportEntitlementInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
};

export type AddLabelsToLabelableInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  labelIds: Array<Scalars['ID']>;
  labelableId: Scalars['ID'];
};

export type AddProjectCardInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  contentId: InputMaybe<Scalars['ID']>;
  note: InputMaybe<Scalars['String']>;
  projectColumnId: Scalars['ID'];
};

export type AddProjectColumnInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['ID'];
};

export type AddProjectV2DraftIssueInput = {
  assigneeIds: InputMaybe<Array<Scalars['ID']>>;
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  title: Scalars['String'];
};

export type AddProjectV2ItemByIdInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  contentId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export type AddPullRequestReviewCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  commitOID: InputMaybe<Scalars['GitObjectID']>;
  inReplyTo: InputMaybe<Scalars['ID']>;
  path: InputMaybe<Scalars['String']>;
  position: InputMaybe<Scalars['Int']>;
  pullRequestId: InputMaybe<Scalars['ID']>;
  pullRequestReviewId: InputMaybe<Scalars['ID']>;
};

export type AddPullRequestReviewInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  comments: InputMaybe<Array<InputMaybe<DraftPullRequestReviewComment>>>;
  commitOID: InputMaybe<Scalars['GitObjectID']>;
  event: InputMaybe<PullRequestReviewEvent>;
  pullRequestId: Scalars['ID'];
  threads: InputMaybe<Array<InputMaybe<DraftPullRequestReviewThread>>>;
};

export type AddPullRequestReviewThreadInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  line: Scalars['Int'];
  path: Scalars['String'];
  pullRequestId: InputMaybe<Scalars['ID']>;
  pullRequestReviewId: InputMaybe<Scalars['ID']>;
  side: InputMaybe<DiffSide>;
  startLine: InputMaybe<Scalars['Int']>;
  startSide: InputMaybe<DiffSide>;
};

export type AddReactionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  content: ReactionContent;
  subjectId: Scalars['ID'];
};

export type AddStarInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  starrableId: Scalars['ID'];
};

export type AddUpvoteInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  subjectId: Scalars['ID'];
};

export type AddVerifiableDomainInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  domain: Scalars['URI'];
  ownerId: Scalars['ID'];
};

export type ApproveDeploymentsInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  comment: InputMaybe<Scalars['String']>;
  environmentIds: Array<Scalars['ID']>;
  workflowRunId: Scalars['ID'];
};

export type ApproveVerifiableDomainInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ArchiveProjectV2ItemInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  itemId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export type ArchiveRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
};

export type AuditLogOrder = {
  direction: InputMaybe<OrderDirection>;
  field: InputMaybe<AuditLogOrderField>;
};

export type AuditLogOrderField =
  | 'CREATED_AT';

export type CancelEnterpriseAdminInvitationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  invitationId: Scalars['ID'];
};

export type CancelSponsorshipInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  sponsorId: InputMaybe<Scalars['ID']>;
  sponsorLogin: InputMaybe<Scalars['String']>;
  sponsorableId: InputMaybe<Scalars['ID']>;
  sponsorableLogin: InputMaybe<Scalars['String']>;
};

export type ChangeUserStatusInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  emoji: InputMaybe<Scalars['String']>;
  expiresAt: InputMaybe<Scalars['DateTime']>;
  limitedAvailability: InputMaybe<Scalars['Boolean']>;
  message: InputMaybe<Scalars['String']>;
  organizationId: InputMaybe<Scalars['ID']>;
};

export type CheckAnnotationData = {
  annotationLevel: CheckAnnotationLevel;
  location: CheckAnnotationRange;
  message: Scalars['String'];
  path: Scalars['String'];
  rawDetails: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

export type CheckAnnotationLevel =
  | 'FAILURE'
  | 'NOTICE'
  | 'WARNING';

export type CheckAnnotationRange = {
  endColumn: InputMaybe<Scalars['Int']>;
  endLine: Scalars['Int'];
  startColumn: InputMaybe<Scalars['Int']>;
  startLine: Scalars['Int'];
};

export type CheckConclusionState =
  | 'ACTION_REQUIRED'
  | 'CANCELLED'
  | 'FAILURE'
  | 'NEUTRAL'
  | 'SKIPPED'
  | 'STALE'
  | 'STARTUP_FAILURE'
  | 'SUCCESS'
  | 'TIMED_OUT';

export type CheckRunAction = {
  description: Scalars['String'];
  identifier: Scalars['String'];
  label: Scalars['String'];
};

export type CheckRunFilter = {
  appId: InputMaybe<Scalars['Int']>;
  checkName: InputMaybe<Scalars['String']>;
  checkType: InputMaybe<CheckRunType>;
  conclusions: InputMaybe<Array<CheckConclusionState>>;
  status: InputMaybe<CheckStatusState>;
  statuses: InputMaybe<Array<CheckStatusState>>;
};

export type CheckRunOutput = {
  annotations: InputMaybe<Array<CheckAnnotationData>>;
  images: InputMaybe<Array<CheckRunOutputImage>>;
  summary: Scalars['String'];
  text: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CheckRunOutputImage = {
  alt: Scalars['String'];
  caption: InputMaybe<Scalars['String']>;
  imageUrl: Scalars['URI'];
};

export type CheckRunState =
  | 'ACTION_REQUIRED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILURE'
  | 'IN_PROGRESS'
  | 'NEUTRAL'
  | 'PENDING'
  | 'QUEUED'
  | 'SKIPPED'
  | 'STALE'
  | 'STARTUP_FAILURE'
  | 'SUCCESS'
  | 'TIMED_OUT'
  | 'WAITING';

export type CheckRunType =
  | 'ALL'
  | 'LATEST';

export type CheckStatusState =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PENDING'
  | 'QUEUED'
  | 'REQUESTED'
  | 'WAITING';

export type CheckSuiteAutoTriggerPreference = {
  appId: Scalars['ID'];
  setting: Scalars['Boolean'];
};

export type CheckSuiteFilter = {
  appId: InputMaybe<Scalars['Int']>;
  checkName: InputMaybe<Scalars['String']>;
};

export type ClearLabelsFromLabelableInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  labelableId: Scalars['ID'];
};

export type ClearProjectV2ItemFieldValueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  fieldId: Scalars['ID'];
  itemId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export type CloneProjectInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  includeWorkflows: Scalars['Boolean'];
  name: Scalars['String'];
  public: InputMaybe<Scalars['Boolean']>;
  sourceId: Scalars['ID'];
  targetOwnerId: Scalars['ID'];
};

export type CloneTemplateRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  includeAllBranches: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  repositoryId: Scalars['ID'];
  visibility: RepositoryVisibility;
};

export type CloseIssueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  issueId: Scalars['ID'];
  stateReason: InputMaybe<IssueClosedStateReason>;
};

export type ClosePullRequestInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestId: Scalars['ID'];
};

export type CollaboratorAffiliation =
  | 'ALL'
  | 'DIRECT'
  | 'OUTSIDE';

export type CommentAuthorAssociation =
  | 'COLLABORATOR'
  | 'CONTRIBUTOR'
  | 'FIRST_TIMER'
  | 'FIRST_TIME_CONTRIBUTOR'
  | 'MANNEQUIN'
  | 'MEMBER'
  | 'NONE'
  | 'OWNER';

export type CommentCannotUpdateReason =
  | 'ARCHIVED'
  | 'DENIED'
  | 'INSUFFICIENT_ACCESS'
  | 'LOCKED'
  | 'LOGIN_REQUIRED'
  | 'MAINTENANCE'
  | 'VERIFIED_EMAIL_REQUIRED';

export type CommitAuthor = {
  emails: InputMaybe<Array<Scalars['String']>>;
  id: InputMaybe<Scalars['ID']>;
};

export type CommitContributionOrder = {
  direction: OrderDirection;
  field: CommitContributionOrderField;
};

export type CommitContributionOrderField =
  | 'COMMIT_COUNT'
  | 'OCCURRED_AT';

export type CommitMessage = {
  body: InputMaybe<Scalars['String']>;
  headline: Scalars['String'];
};

export type CommittableBranch = {
  branchName: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  repositoryNameWithOwner: InputMaybe<Scalars['String']>;
};

export type ComparisonStatus =
  | 'AHEAD'
  | 'BEHIND'
  | 'DIVERGED'
  | 'IDENTICAL';

export type ContributionLevel =
  | 'FIRST_QUARTILE'
  | 'FOURTH_QUARTILE'
  | 'NONE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE';

export type ContributionOrder = {
  direction: OrderDirection;
};

export type ConvertProjectCardNoteToIssueInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  projectCardId: Scalars['ID'];
  repositoryId: Scalars['ID'];
  title: InputMaybe<Scalars['String']>;
};

export type ConvertPullRequestToDraftInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestId: Scalars['ID'];
};

export type CopyProjectV2Input = {
  clientMutationId: InputMaybe<Scalars['String']>;
  includeDraftIssues: InputMaybe<Scalars['Boolean']>;
  ownerId: Scalars['ID'];
  projectId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateAttributionInvitationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
  sourceId: Scalars['ID'];
  targetId: Scalars['ID'];
};

export type CreateBranchProtectionRuleInput = {
  allowsDeletions: InputMaybe<Scalars['Boolean']>;
  allowsForcePushes: InputMaybe<Scalars['Boolean']>;
  blocksCreations: InputMaybe<Scalars['Boolean']>;
  bypassForcePushActorIds: InputMaybe<Array<Scalars['ID']>>;
  bypassPullRequestActorIds: InputMaybe<Array<Scalars['ID']>>;
  clientMutationId: InputMaybe<Scalars['String']>;
  dismissesStaleReviews: InputMaybe<Scalars['Boolean']>;
  isAdminEnforced: InputMaybe<Scalars['Boolean']>;
  lockAllowsFetchAndMerge: InputMaybe<Scalars['Boolean']>;
  lockBranch: InputMaybe<Scalars['Boolean']>;
  pattern: Scalars['String'];
  pushActorIds: InputMaybe<Array<Scalars['ID']>>;
  repositoryId: Scalars['ID'];
  requireLastPushApproval: InputMaybe<Scalars['Boolean']>;
  requiredApprovingReviewCount: InputMaybe<Scalars['Int']>;
  requiredDeploymentEnvironments: InputMaybe<Array<Scalars['String']>>;
  requiredStatusCheckContexts: InputMaybe<Array<Scalars['String']>>;
  requiredStatusChecks: InputMaybe<Array<RequiredStatusCheckInput>>;
  requiresApprovingReviews: InputMaybe<Scalars['Boolean']>;
  requiresCodeOwnerReviews: InputMaybe<Scalars['Boolean']>;
  requiresCommitSignatures: InputMaybe<Scalars['Boolean']>;
  requiresConversationResolution: InputMaybe<Scalars['Boolean']>;
  requiresDeployments: InputMaybe<Scalars['Boolean']>;
  requiresLinearHistory: InputMaybe<Scalars['Boolean']>;
  requiresStatusChecks: InputMaybe<Scalars['Boolean']>;
  requiresStrictStatusChecks: InputMaybe<Scalars['Boolean']>;
  restrictsPushes: InputMaybe<Scalars['Boolean']>;
  restrictsReviewDismissals: InputMaybe<Scalars['Boolean']>;
  reviewDismissalActorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateCheckRunInput = {
  actions: InputMaybe<Array<CheckRunAction>>;
  clientMutationId: InputMaybe<Scalars['String']>;
  completedAt: InputMaybe<Scalars['DateTime']>;
  conclusion: InputMaybe<CheckConclusionState>;
  detailsUrl: InputMaybe<Scalars['URI']>;
  externalId: InputMaybe<Scalars['String']>;
  headSha: Scalars['GitObjectID'];
  name: Scalars['String'];
  output: InputMaybe<CheckRunOutput>;
  repositoryId: Scalars['ID'];
  startedAt: InputMaybe<Scalars['DateTime']>;
  status: InputMaybe<RequestableCheckStatusState>;
};

export type CreateCheckSuiteInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  headSha: Scalars['GitObjectID'];
  repositoryId: Scalars['ID'];
};

export type CreateCommitOnBranchInput = {
  branch: CommittableBranch;
  clientMutationId: InputMaybe<Scalars['String']>;
  expectedHeadOid: Scalars['GitObjectID'];
  fileChanges: InputMaybe<FileChanges>;
  message: CommitMessage;
};

export type CreateDiscussionInput = {
  body: Scalars['String'];
  categoryId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateEnterpriseOrganizationInput = {
  adminLogins: Array<Scalars['String']>;
  billingEmail: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
  profileName: Scalars['String'];
};

export type CreateEnvironmentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  repositoryId: Scalars['ID'];
};

export type CreateIpAllowListEntryInput = {
  allowListValue: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  name: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
};

export type CreateIssueInput = {
  assigneeIds: InputMaybe<Array<Scalars['ID']>>;
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  issueTemplate: InputMaybe<Scalars['String']>;
  labelIds: InputMaybe<Array<Scalars['ID']>>;
  milestoneId: InputMaybe<Scalars['ID']>;
  projectIds: InputMaybe<Array<Scalars['ID']>>;
  repositoryId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateLinkedBranchInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  issueId: Scalars['ID'];
  name: InputMaybe<Scalars['String']>;
  oid: Scalars['GitObjectID'];
  repositoryId: InputMaybe<Scalars['ID']>;
};

export type CreateMigrationSourceInput = {
  accessToken: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  githubPat: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  type: MigrationSourceType;
  url: Scalars['String'];
};

export type CreateProjectInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  repositoryIds: InputMaybe<Array<Scalars['ID']>>;
  template: InputMaybe<ProjectTemplate>;
};

export type CreateProjectV2FieldInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  dataType: ProjectV2CustomFieldType;
  name: Scalars['String'];
  projectId: Scalars['ID'];
  singleSelectOptions: InputMaybe<Array<ProjectV2SingleSelectFieldOptionInput>>;
};

export type CreateProjectV2Input = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
  repositoryId: InputMaybe<Scalars['ID']>;
  teamId: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type CreatePullRequestInput = {
  baseRefName: Scalars['String'];
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  draft: InputMaybe<Scalars['Boolean']>;
  headRefName: Scalars['String'];
  headRepositoryId: InputMaybe<Scalars['ID']>;
  maintainerCanModify: InputMaybe<Scalars['Boolean']>;
  repositoryId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateRefInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  oid: Scalars['GitObjectID'];
  repositoryId: Scalars['ID'];
};

export type CreateRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  hasIssuesEnabled: InputMaybe<Scalars['Boolean']>;
  hasWikiEnabled: InputMaybe<Scalars['Boolean']>;
  homepageUrl: InputMaybe<Scalars['URI']>;
  name: Scalars['String'];
  ownerId: InputMaybe<Scalars['ID']>;
  teamId: InputMaybe<Scalars['ID']>;
  template: InputMaybe<Scalars['Boolean']>;
  visibility: RepositoryVisibility;
};

export type CreateSponsorsListingInput = {
  billingCountryOrRegionCode: InputMaybe<SponsorsCountryOrRegionCode>;
  clientMutationId: InputMaybe<Scalars['String']>;
  contactEmail: InputMaybe<Scalars['String']>;
  fiscalHostLogin: InputMaybe<Scalars['String']>;
  fiscallyHostedProjectProfileUrl: InputMaybe<Scalars['String']>;
  fullDescription: InputMaybe<Scalars['String']>;
  residenceCountryOrRegionCode: InputMaybe<SponsorsCountryOrRegionCode>;
  sponsorableLogin: InputMaybe<Scalars['String']>;
};

export type CreateSponsorsTierInput = {
  amount: Scalars['Int'];
  clientMutationId: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  isRecurring: InputMaybe<Scalars['Boolean']>;
  publish: InputMaybe<Scalars['Boolean']>;
  repositoryId: InputMaybe<Scalars['ID']>;
  repositoryName: InputMaybe<Scalars['String']>;
  repositoryOwnerLogin: InputMaybe<Scalars['String']>;
  sponsorableId: InputMaybe<Scalars['ID']>;
  sponsorableLogin: InputMaybe<Scalars['String']>;
  welcomeMessage: InputMaybe<Scalars['String']>;
};

export type CreateSponsorshipInput = {
  amount: InputMaybe<Scalars['Int']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  isRecurring: InputMaybe<Scalars['Boolean']>;
  privacyLevel: InputMaybe<SponsorshipPrivacy>;
  receiveEmails: InputMaybe<Scalars['Boolean']>;
  sponsorId: InputMaybe<Scalars['ID']>;
  sponsorLogin: InputMaybe<Scalars['String']>;
  sponsorableId: InputMaybe<Scalars['ID']>;
  sponsorableLogin: InputMaybe<Scalars['String']>;
  tierId: InputMaybe<Scalars['ID']>;
};

export type CreateTeamDiscussionCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  discussionId: Scalars['ID'];
};

export type CreateTeamDiscussionInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  private: InputMaybe<Scalars['Boolean']>;
  teamId: Scalars['ID'];
  title: Scalars['String'];
};

export type DeclineTopicSuggestionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  reason: TopicSuggestionDeclineReason;
  repositoryId: Scalars['ID'];
};

export type DefaultRepositoryPermissionField =
  | 'ADMIN'
  | 'NONE'
  | 'READ'
  | 'WRITE';

export type DeleteBranchProtectionRuleInput = {
  branchProtectionRuleId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
};

export type DeleteDeploymentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteDiscussionCommentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteDiscussionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteEnvironmentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteIpAllowListEntryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ipAllowListEntryId: Scalars['ID'];
};

export type DeleteIssueCommentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteIssueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  issueId: Scalars['ID'];
};

export type DeleteLinkedBranchInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  linkedBranchId: Scalars['ID'];
};

export type DeleteProjectCardInput = {
  cardId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
};

export type DeleteProjectColumnInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  columnId: Scalars['ID'];
};

export type DeleteProjectInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
};

export type DeleteProjectV2FieldInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  fieldId: Scalars['ID'];
};

export type DeleteProjectV2Input = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
};

export type DeleteProjectV2ItemInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  itemId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export type DeletePullRequestReviewCommentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeletePullRequestReviewInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestReviewId: Scalars['ID'];
};

export type DeleteRefInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  refId: Scalars['ID'];
};

export type DeleteTeamDiscussionCommentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteTeamDiscussionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteVerifiableDomainInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DependencyGraphEcosystem =
  | 'ACTIONS'
  | 'COMPOSER'
  | 'GO'
  | 'MAVEN'
  | 'NPM'
  | 'NUGET'
  | 'PIP'
  | 'PUB'
  | 'RUBYGEMS'
  | 'RUST';

export type DeploymentOrder = {
  direction: OrderDirection;
  field: DeploymentOrderField;
};

export type DeploymentOrderField =
  | 'CREATED_AT';

export type DeploymentProtectionRuleType =
  | 'REQUIRED_REVIEWERS'
  | 'WAIT_TIMER';

export type DeploymentReviewState =
  | 'APPROVED'
  | 'REJECTED';

export type DeploymentState =
  | 'ABANDONED'
  | 'ACTIVE'
  | 'DESTROYED'
  | 'ERROR'
  | 'FAILURE'
  | 'INACTIVE'
  | 'IN_PROGRESS'
  | 'PENDING'
  | 'QUEUED'
  | 'WAITING';

export type DeploymentStatusState =
  | 'ERROR'
  | 'FAILURE'
  | 'INACTIVE'
  | 'IN_PROGRESS'
  | 'PENDING'
  | 'QUEUED'
  | 'SUCCESS'
  | 'WAITING';

export type DiffSide =
  | 'LEFT'
  | 'RIGHT';

export type DisablePullRequestAutoMergeInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestId: Scalars['ID'];
};

export type DiscussionOrder = {
  direction: OrderDirection;
  field: DiscussionOrderField;
};

export type DiscussionOrderField =
  | 'CREATED_AT'
  | 'UPDATED_AT';

export type DiscussionPollOptionOrder = {
  direction: OrderDirection;
  field: DiscussionPollOptionOrderField;
};

export type DiscussionPollOptionOrderField =
  | 'AUTHORED_ORDER'
  | 'VOTE_COUNT';

export type DismissPullRequestReviewInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  pullRequestReviewId: Scalars['ID'];
};

export type DismissReason =
  | 'FIX_STARTED'
  | 'INACCURATE'
  | 'NOT_USED'
  | 'NO_BANDWIDTH'
  | 'TOLERABLE_RISK';

export type DismissRepositoryVulnerabilityAlertInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  dismissReason: DismissReason;
  repositoryVulnerabilityAlertId: Scalars['ID'];
};

export type DraftPullRequestReviewComment = {
  body: Scalars['String'];
  path: Scalars['String'];
  position: Scalars['Int'];
};

export type DraftPullRequestReviewThread = {
  body: Scalars['String'];
  line: Scalars['Int'];
  path: Scalars['String'];
  side: InputMaybe<DiffSide>;
  startLine: InputMaybe<Scalars['Int']>;
  startSide: InputMaybe<DiffSide>;
};

export type EnablePullRequestAutoMergeInput = {
  authorEmail: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  commitBody: InputMaybe<Scalars['String']>;
  commitHeadline: InputMaybe<Scalars['String']>;
  expectedHeadOid: InputMaybe<Scalars['GitObjectID']>;
  mergeMethod: InputMaybe<PullRequestMergeMethod>;
  pullRequestId: Scalars['ID'];
};

export type EnterpriseAdministratorInvitationOrder = {
  direction: OrderDirection;
  field: EnterpriseAdministratorInvitationOrderField;
};

export type EnterpriseAdministratorInvitationOrderField =
  | 'CREATED_AT';

export type EnterpriseAdministratorRole =
  | 'BILLING_MANAGER'
  | 'OWNER';

export type EnterpriseAllowPrivateRepositoryForkingPolicyValue =
  | 'ENTERPRISE_ORGANIZATIONS'
  | 'ENTERPRISE_ORGANIZATIONS_USER_ACCOUNTS'
  | 'EVERYWHERE'
  | 'SAME_ORGANIZATION'
  | 'SAME_ORGANIZATION_USER_ACCOUNTS'
  | 'USER_ACCOUNTS';

export type EnterpriseDefaultRepositoryPermissionSettingValue =
  | 'ADMIN'
  | 'NONE'
  | 'NO_POLICY'
  | 'READ'
  | 'WRITE';

export type EnterpriseEnabledDisabledSettingValue =
  | 'DISABLED'
  | 'ENABLED'
  | 'NO_POLICY';

export type EnterpriseEnabledSettingValue =
  | 'ENABLED'
  | 'NO_POLICY';

export type EnterpriseMemberOrder = {
  direction: OrderDirection;
  field: EnterpriseMemberOrderField;
};

export type EnterpriseMemberOrderField =
  | 'CREATED_AT'
  | 'LOGIN';

export type EnterpriseMembersCanCreateRepositoriesSettingValue =
  | 'ALL'
  | 'DISABLED'
  | 'NO_POLICY'
  | 'PRIVATE'
  | 'PUBLIC';

export type EnterpriseMembersCanMakePurchasesSettingValue =
  | 'DISABLED'
  | 'ENABLED';

export type EnterpriseServerInstallationOrder = {
  direction: OrderDirection;
  field: EnterpriseServerInstallationOrderField;
};

export type EnterpriseServerInstallationOrderField =
  | 'CREATED_AT'
  | 'CUSTOMER_NAME'
  | 'HOST_NAME';

export type EnterpriseServerUserAccountEmailOrder = {
  direction: OrderDirection;
  field: EnterpriseServerUserAccountEmailOrderField;
};

export type EnterpriseServerUserAccountEmailOrderField =
  | 'EMAIL';

export type EnterpriseServerUserAccountOrder = {
  direction: OrderDirection;
  field: EnterpriseServerUserAccountOrderField;
};

export type EnterpriseServerUserAccountOrderField =
  | 'LOGIN'
  | 'REMOTE_CREATED_AT';

export type EnterpriseServerUserAccountsUploadOrder = {
  direction: OrderDirection;
  field: EnterpriseServerUserAccountsUploadOrderField;
};

export type EnterpriseServerUserAccountsUploadOrderField =
  | 'CREATED_AT';

export type EnterpriseServerUserAccountsUploadSyncState =
  | 'FAILURE'
  | 'PENDING'
  | 'SUCCESS';

export type EnterpriseUserAccountMembershipRole =
  | 'MEMBER'
  | 'OWNER'
  | 'UNAFFILIATED';

export type EnterpriseUserDeployment =
  | 'CLOUD'
  | 'SERVER';

export type FileAddition = {
  contents: Scalars['Base64String'];
  path: Scalars['String'];
};

export type FileChanges = {
  additions: InputMaybe<Array<FileAddition>>;
  deletions: InputMaybe<Array<FileDeletion>>;
};

export type FileDeletion = {
  path: Scalars['String'];
};

export type FileViewedState =
  | 'DISMISSED'
  | 'UNVIEWED'
  | 'VIEWED';

export type FollowOrganizationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
};

export type FollowUserInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type FundingPlatform =
  | 'COMMUNITY_BRIDGE'
  | 'CUSTOM'
  | 'GITHUB'
  | 'ISSUEHUNT'
  | 'KO_FI'
  | 'LFX_CROWDFUNDING'
  | 'LIBERAPAY'
  | 'OPEN_COLLECTIVE'
  | 'OTECHIE'
  | 'PATREON'
  | 'TIDELIFT';

export type GistOrder = {
  direction: OrderDirection;
  field: GistOrderField;
};

export type GistOrderField =
  | 'CREATED_AT'
  | 'PUSHED_AT'
  | 'UPDATED_AT';

export type GistPrivacy =
  | 'ALL'
  | 'PUBLIC'
  | 'SECRET';

export type GitSignatureState =
  | 'BAD_CERT'
  | 'BAD_EMAIL'
  | 'EXPIRED_KEY'
  | 'GPGVERIFY_ERROR'
  | 'GPGVERIFY_UNAVAILABLE'
  | 'INVALID'
  | 'MALFORMED_SIG'
  | 'NOT_SIGNING_KEY'
  | 'NO_USER'
  | 'OCSP_ERROR'
  | 'OCSP_PENDING'
  | 'OCSP_REVOKED'
  | 'UNKNOWN_KEY'
  | 'UNKNOWN_SIG_TYPE'
  | 'UNSIGNED'
  | 'UNVERIFIED_EMAIL'
  | 'VALID';

export type GrantEnterpriseOrganizationsMigratorRoleInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
};

export type GrantMigratorRoleInput = {
  actor: Scalars['String'];
  actorType: ActorType;
  clientMutationId: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
};

export type IdentityProviderConfigurationState =
  | 'CONFIGURED'
  | 'ENFORCED'
  | 'UNCONFIGURED';

export type InviteEnterpriseAdminInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  invitee: InputMaybe<Scalars['String']>;
  role: InputMaybe<EnterpriseAdministratorRole>;
};

export type IpAllowListEnabledSettingValue =
  | 'DISABLED'
  | 'ENABLED';

export type IpAllowListEntryOrder = {
  direction: OrderDirection;
  field: IpAllowListEntryOrderField;
};

export type IpAllowListEntryOrderField =
  | 'ALLOW_LIST_VALUE'
  | 'CREATED_AT';

export type IpAllowListForInstalledAppsEnabledSettingValue =
  | 'DISABLED'
  | 'ENABLED';

export type IssueClosedStateReason =
  | 'COMPLETED'
  | 'NOT_PLANNED';

export type IssueCommentOrder = {
  direction: OrderDirection;
  field: IssueCommentOrderField;
};

export type IssueCommentOrderField =
  | 'UPDATED_AT';

export type IssueFilters = {
  assignee: InputMaybe<Scalars['String']>;
  createdBy: InputMaybe<Scalars['String']>;
  labels: InputMaybe<Array<Scalars['String']>>;
  mentioned: InputMaybe<Scalars['String']>;
  milestone: InputMaybe<Scalars['String']>;
  milestoneNumber: InputMaybe<Scalars['String']>;
  since: InputMaybe<Scalars['DateTime']>;
  states: InputMaybe<Array<IssueState>>;
  viewerSubscribed: InputMaybe<Scalars['Boolean']>;
};

export type IssueOrder = {
  direction: OrderDirection;
  field: IssueOrderField;
};

export type IssueOrderField =
  | 'COMMENTS'
  | 'CREATED_AT'
  | 'UPDATED_AT';

export type IssueState =
  | 'CLOSED'
  | 'OPEN';

export type IssueStateReason =
  | 'COMPLETED'
  | 'NOT_PLANNED'
  | 'REOPENED';

export type IssueTimelineItemsItemType =
  | 'ADDED_TO_PROJECT_EVENT'
  | 'ASSIGNED_EVENT'
  | 'CLOSED_EVENT'
  | 'COMMENT_DELETED_EVENT'
  | 'CONNECTED_EVENT'
  | 'CONVERTED_NOTE_TO_ISSUE_EVENT'
  | 'CONVERTED_TO_DISCUSSION_EVENT'
  | 'CROSS_REFERENCED_EVENT'
  | 'DEMILESTONED_EVENT'
  | 'DISCONNECTED_EVENT'
  | 'ISSUE_COMMENT'
  | 'LABELED_EVENT'
  | 'LOCKED_EVENT'
  | 'MARKED_AS_DUPLICATE_EVENT'
  | 'MENTIONED_EVENT'
  | 'MILESTONED_EVENT'
  | 'MOVED_COLUMNS_IN_PROJECT_EVENT'
  | 'PINNED_EVENT'
  | 'REFERENCED_EVENT'
  | 'REMOVED_FROM_PROJECT_EVENT'
  | 'RENAMED_TITLE_EVENT'
  | 'REOPENED_EVENT'
  | 'SUBSCRIBED_EVENT'
  | 'TRANSFERRED_EVENT'
  | 'UNASSIGNED_EVENT'
  | 'UNLABELED_EVENT'
  | 'UNLOCKED_EVENT'
  | 'UNMARKED_AS_DUPLICATE_EVENT'
  | 'UNPINNED_EVENT'
  | 'UNSUBSCRIBED_EVENT'
  | 'USER_BLOCKED_EVENT';

export type LabelOrder = {
  direction: OrderDirection;
  field: LabelOrderField;
};

export type LabelOrderField =
  | 'CREATED_AT'
  | 'NAME';

export type LanguageOrder = {
  direction: OrderDirection;
  field: LanguageOrderField;
};

export type LanguageOrderField =
  | 'SIZE';

export type LinkProjectV2ToRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  repositoryId: Scalars['ID'];
};

export type LinkProjectV2ToTeamInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type LinkRepositoryToProjectInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  repositoryId: Scalars['ID'];
};

export type LockLockableInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  lockReason: InputMaybe<LockReason>;
  lockableId: Scalars['ID'];
};

export type LockReason =
  | 'OFF_TOPIC'
  | 'RESOLVED'
  | 'SPAM'
  | 'TOO_HEATED';

export type MannequinOrder = {
  direction: OrderDirection;
  field: MannequinOrderField;
};

export type MannequinOrderField =
  | 'CREATED_AT'
  | 'LOGIN';

export type MarkDiscussionCommentAsAnswerInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type MarkFileAsViewedInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  path: Scalars['String'];
  pullRequestId: Scalars['ID'];
};

export type MarkPullRequestReadyForReviewInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestId: Scalars['ID'];
};

export type MergeBranchInput = {
  authorEmail: InputMaybe<Scalars['String']>;
  base: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  commitMessage: InputMaybe<Scalars['String']>;
  head: Scalars['String'];
  repositoryId: Scalars['ID'];
};

export type MergeCommitMessage =
  | 'BLANK'
  | 'PR_BODY'
  | 'PR_TITLE';

export type MergeCommitTitle =
  | 'MERGE_MESSAGE'
  | 'PR_TITLE';

export type MergePullRequestInput = {
  authorEmail: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  commitBody: InputMaybe<Scalars['String']>;
  commitHeadline: InputMaybe<Scalars['String']>;
  expectedHeadOid: InputMaybe<Scalars['GitObjectID']>;
  mergeMethod: InputMaybe<PullRequestMergeMethod>;
  pullRequestId: Scalars['ID'];
};

export type MergeableState =
  | 'CONFLICTING'
  | 'MERGEABLE'
  | 'UNKNOWN';

export type MigrationSourceType =
  | 'AZURE_DEVOPS'
  | 'BITBUCKET_SERVER'
  | 'GITHUB_ARCHIVE';

export type MigrationState =
  | 'FAILED'
  | 'FAILED_VALIDATION'
  | 'IN_PROGRESS'
  | 'NOT_STARTED'
  | 'PENDING_VALIDATION'
  | 'QUEUED'
  | 'SUCCEEDED';

export type MilestoneOrder = {
  direction: OrderDirection;
  field: MilestoneOrderField;
};

export type MilestoneOrderField =
  | 'CREATED_AT'
  | 'DUE_DATE'
  | 'NUMBER'
  | 'UPDATED_AT';

export type MilestoneState =
  | 'CLOSED'
  | 'OPEN';

export type MinimizeCommentInput = {
  classifier: ReportedContentClassifiers;
  clientMutationId: InputMaybe<Scalars['String']>;
  subjectId: Scalars['ID'];
};

export type MoveProjectCardInput = {
  afterCardId: InputMaybe<Scalars['ID']>;
  cardId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
  columnId: Scalars['ID'];
};

export type MoveProjectColumnInput = {
  afterColumnId: InputMaybe<Scalars['ID']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  columnId: Scalars['ID'];
};

export type NotificationRestrictionSettingValue =
  | 'DISABLED'
  | 'ENABLED';

export type OidcProviderType =
  | 'AAD';

export type OauthApplicationCreateAuditEntryState =
  | 'ACTIVE'
  | 'PENDING_DELETION'
  | 'SUSPENDED';

export type OperationType =
  | 'ACCESS'
  | 'AUTHENTICATION'
  | 'CREATE'
  | 'MODIFY'
  | 'REMOVE'
  | 'RESTORE'
  | 'TRANSFER';

export type OrderDirection =
  | 'ASC'
  | 'DESC';

export type OrgAddMemberAuditEntryPermission =
  | 'ADMIN'
  | 'READ';

export type OrgCreateAuditEntryBillingPlan =
  | 'BUSINESS'
  | 'BUSINESS_PLUS'
  | 'FREE'
  | 'TIERED_PER_SEAT'
  | 'UNLIMITED';

export type OrgEnterpriseOwnerOrder = {
  direction: OrderDirection;
  field: OrgEnterpriseOwnerOrderField;
};

export type OrgEnterpriseOwnerOrderField =
  | 'LOGIN';

export type OrgRemoveBillingManagerAuditEntryReason =
  | 'SAML_EXTERNAL_IDENTITY_MISSING'
  | 'SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY'
  | 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE';

export type OrgRemoveMemberAuditEntryMembershipType =
  | 'ADMIN'
  | 'BILLING_MANAGER'
  | 'DIRECT_MEMBER'
  | 'OUTSIDE_COLLABORATOR'
  | 'SUSPENDED'
  | 'UNAFFILIATED';

export type OrgRemoveMemberAuditEntryReason =
  | 'SAML_EXTERNAL_IDENTITY_MISSING'
  | 'SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY'
  | 'TWO_FACTOR_ACCOUNT_RECOVERY'
  | 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE'
  | 'USER_ACCOUNT_DELETED';

export type OrgRemoveOutsideCollaboratorAuditEntryMembershipType =
  | 'BILLING_MANAGER'
  | 'OUTSIDE_COLLABORATOR'
  | 'UNAFFILIATED';

export type OrgRemoveOutsideCollaboratorAuditEntryReason =
  | 'SAML_EXTERNAL_IDENTITY_MISSING'
  | 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE';

export type OrgUpdateDefaultRepositoryPermissionAuditEntryPermission =
  | 'ADMIN'
  | 'NONE'
  | 'READ'
  | 'WRITE';

export type OrgUpdateMemberAuditEntryPermission =
  | 'ADMIN'
  | 'READ';

export type OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility =
  | 'ALL'
  | 'INTERNAL'
  | 'NONE'
  | 'PRIVATE'
  | 'PRIVATE_INTERNAL'
  | 'PUBLIC'
  | 'PUBLIC_INTERNAL'
  | 'PUBLIC_PRIVATE';

export type OrganizationInvitationRole =
  | 'ADMIN'
  | 'BILLING_MANAGER'
  | 'DIRECT_MEMBER'
  | 'REINSTATE';

export type OrganizationInvitationSource =
  | 'MEMBER'
  | 'SCIM'
  | 'UNKNOWN';

export type OrganizationInvitationType =
  | 'EMAIL'
  | 'USER';

export type OrganizationMemberRole =
  | 'ADMIN'
  | 'MEMBER';

export type OrganizationMembersCanCreateRepositoriesSettingValue =
  | 'ALL'
  | 'DISABLED'
  | 'INTERNAL'
  | 'PRIVATE';

export type OrganizationMigrationState =
  | 'FAILED'
  | 'IN_PROGRESS'
  | 'NOT_STARTED'
  | 'POST_REPO_MIGRATION'
  | 'PRE_REPO_MIGRATION'
  | 'QUEUED'
  | 'REPO_MIGRATION'
  | 'SUCCEEDED';

export type OrganizationOrder = {
  direction: OrderDirection;
  field: OrganizationOrderField;
};

export type OrganizationOrderField =
  | 'CREATED_AT'
  | 'LOGIN';

export type PackageFileOrder = {
  direction: InputMaybe<OrderDirection>;
  field: InputMaybe<PackageFileOrderField>;
};

export type PackageFileOrderField =
  | 'CREATED_AT';

export type PackageOrder = {
  direction: InputMaybe<OrderDirection>;
  field: InputMaybe<PackageOrderField>;
};

export type PackageOrderField =
  | 'CREATED_AT';

export type PackageType =
  | 'DEBIAN'
  | 'DOCKER'
  | 'MAVEN'
  | 'NPM'
  | 'NUGET'
  | 'PYPI'
  | 'RUBYGEMS';

export type PackageVersionOrder = {
  direction: InputMaybe<OrderDirection>;
  field: InputMaybe<PackageVersionOrderField>;
};

export type PackageVersionOrderField =
  | 'CREATED_AT';

export type PatchStatus =
  | 'ADDED'
  | 'CHANGED'
  | 'COPIED'
  | 'DELETED'
  | 'MODIFIED'
  | 'RENAMED';

export type PinIssueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  issueId: Scalars['ID'];
};

export type PinnableItemType =
  | 'GIST'
  | 'ISSUE'
  | 'ORGANIZATION'
  | 'PROJECT'
  | 'PULL_REQUEST'
  | 'REPOSITORY'
  | 'TEAM'
  | 'USER';

export type PinnedDiscussionGradient =
  | 'BLUE_MINT'
  | 'BLUE_PURPLE'
  | 'PINK_BLUE'
  | 'PURPLE_CORAL'
  | 'RED_ORANGE';

export type PinnedDiscussionPattern =
  | 'CHEVRON_UP'
  | 'DOT'
  | 'DOT_FILL'
  | 'HEART_FILL'
  | 'PLUS'
  | 'ZAP';

export type ProjectCardArchivedState =
  | 'ARCHIVED'
  | 'NOT_ARCHIVED';

export type ProjectCardState =
  | 'CONTENT_ONLY'
  | 'NOTE_ONLY'
  | 'REDACTED';

export type ProjectColumnPurpose =
  | 'DONE'
  | 'IN_PROGRESS'
  | 'TODO';

export type ProjectOrder = {
  direction: OrderDirection;
  field: ProjectOrderField;
};

export type ProjectOrderField =
  | 'CREATED_AT'
  | 'NAME'
  | 'UPDATED_AT';

export type ProjectState =
  | 'CLOSED'
  | 'OPEN';

export type ProjectTemplate =
  | 'AUTOMATED_KANBAN_V2'
  | 'AUTOMATED_REVIEWS_KANBAN'
  | 'BASIC_KANBAN'
  | 'BUG_TRIAGE';

export type ProjectV2CustomFieldType =
  | 'DATE'
  | 'NUMBER'
  | 'SINGLE_SELECT'
  | 'TEXT';

export type ProjectV2FieldOrder = {
  direction: OrderDirection;
  field: ProjectV2FieldOrderField;
};

export type ProjectV2FieldOrderField =
  | 'CREATED_AT'
  | 'NAME'
  | 'POSITION';

export type ProjectV2FieldType =
  | 'ASSIGNEES'
  | 'DATE'
  | 'ITERATION'
  | 'LABELS'
  | 'LINKED_PULL_REQUESTS'
  | 'MILESTONE'
  | 'NUMBER'
  | 'REPOSITORY'
  | 'REVIEWERS'
  | 'SINGLE_SELECT'
  | 'TEXT'
  | 'TITLE'
  | 'TRACKED_BY'
  | 'TRACKS';

export type ProjectV2FieldValue = {
  date: InputMaybe<Scalars['Date']>;
  iterationId: InputMaybe<Scalars['String']>;
  number: InputMaybe<Scalars['Float']>;
  singleSelectOptionId: InputMaybe<Scalars['String']>;
  text: InputMaybe<Scalars['String']>;
};

export type ProjectV2Filters = {
  state: InputMaybe<ProjectV2State>;
};

export type ProjectV2ItemFieldValueOrder = {
  direction: OrderDirection;
  field: ProjectV2ItemFieldValueOrderField;
};

export type ProjectV2ItemFieldValueOrderField =
  | 'POSITION';

export type ProjectV2ItemOrder = {
  direction: OrderDirection;
  field: ProjectV2ItemOrderField;
};

export type ProjectV2ItemOrderField =
  | 'POSITION';

export type ProjectV2ItemType =
  | 'DRAFT_ISSUE'
  | 'ISSUE'
  | 'PULL_REQUEST'
  | 'REDACTED';

export type ProjectV2Order = {
  direction: OrderDirection;
  field: ProjectV2OrderField;
};

export type ProjectV2OrderField =
  | 'CREATED_AT'
  | 'NUMBER'
  | 'TITLE'
  | 'UPDATED_AT';

export type ProjectV2SingleSelectFieldOptionColor =
  | 'BLUE'
  | 'GRAY'
  | 'GREEN'
  | 'ORANGE'
  | 'PINK'
  | 'PURPLE'
  | 'RED'
  | 'YELLOW';

export type ProjectV2SingleSelectFieldOptionInput = {
  color: ProjectV2SingleSelectFieldOptionColor;
  description: Scalars['String'];
  name: Scalars['String'];
};

export type ProjectV2State =
  | 'CLOSED'
  | 'OPEN';

export type ProjectV2ViewLayout =
  | 'BOARD_LAYOUT'
  | 'ROADMAP_LAYOUT'
  | 'TABLE_LAYOUT';

export type ProjectV2ViewOrder = {
  direction: OrderDirection;
  field: ProjectV2ViewOrderField;
};

export type ProjectV2ViewOrderField =
  | 'CREATED_AT'
  | 'NAME'
  | 'POSITION';

export type ProjectV2WorkflowOrder = {
  direction: OrderDirection;
  field: ProjectV2WorkflowsOrderField;
};

export type ProjectV2WorkflowsOrderField =
  | 'CREATED_AT'
  | 'NAME'
  | 'NUMBER'
  | 'UPDATED_AT';

export type PublishSponsorsTierInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  tierId: Scalars['ID'];
};

export type PullRequestMergeMethod =
  | 'MERGE'
  | 'REBASE'
  | 'SQUASH';

export type PullRequestOrder = {
  direction: OrderDirection;
  field: PullRequestOrderField;
};

export type PullRequestOrderField =
  | 'CREATED_AT'
  | 'UPDATED_AT';

export type PullRequestReviewCommentState =
  | 'PENDING'
  | 'SUBMITTED';

export type PullRequestReviewDecision =
  | 'APPROVED'
  | 'CHANGES_REQUESTED'
  | 'REVIEW_REQUIRED';

export type PullRequestReviewEvent =
  | 'APPROVE'
  | 'COMMENT'
  | 'DISMISS'
  | 'REQUEST_CHANGES';

export type PullRequestReviewState =
  | 'APPROVED'
  | 'CHANGES_REQUESTED'
  | 'COMMENTED'
  | 'DISMISSED'
  | 'PENDING';

export type PullRequestState =
  | 'CLOSED'
  | 'MERGED'
  | 'OPEN';

export type PullRequestTimelineItemsItemType =
  | 'ADDED_TO_MERGE_QUEUE_EVENT'
  | 'ADDED_TO_PROJECT_EVENT'
  | 'ASSIGNED_EVENT'
  | 'AUTOMATIC_BASE_CHANGE_FAILED_EVENT'
  | 'AUTOMATIC_BASE_CHANGE_SUCCEEDED_EVENT'
  | 'AUTO_MERGE_DISABLED_EVENT'
  | 'AUTO_MERGE_ENABLED_EVENT'
  | 'AUTO_REBASE_ENABLED_EVENT'
  | 'AUTO_SQUASH_ENABLED_EVENT'
  | 'BASE_REF_CHANGED_EVENT'
  | 'BASE_REF_DELETED_EVENT'
  | 'BASE_REF_FORCE_PUSHED_EVENT'
  | 'CLOSED_EVENT'
  | 'COMMENT_DELETED_EVENT'
  | 'CONNECTED_EVENT'
  | 'CONVERTED_NOTE_TO_ISSUE_EVENT'
  | 'CONVERTED_TO_DISCUSSION_EVENT'
  | 'CONVERT_TO_DRAFT_EVENT'
  | 'CROSS_REFERENCED_EVENT'
  | 'DEMILESTONED_EVENT'
  | 'DEPLOYED_EVENT'
  | 'DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT'
  | 'DISCONNECTED_EVENT'
  | 'HEAD_REF_DELETED_EVENT'
  | 'HEAD_REF_FORCE_PUSHED_EVENT'
  | 'HEAD_REF_RESTORED_EVENT'
  | 'ISSUE_COMMENT'
  | 'LABELED_EVENT'
  | 'LOCKED_EVENT'
  | 'MARKED_AS_DUPLICATE_EVENT'
  | 'MENTIONED_EVENT'
  | 'MERGED_EVENT'
  | 'MILESTONED_EVENT'
  | 'MOVED_COLUMNS_IN_PROJECT_EVENT'
  | 'PINNED_EVENT'
  | 'PULL_REQUEST_COMMIT'
  | 'PULL_REQUEST_COMMIT_COMMENT_THREAD'
  | 'PULL_REQUEST_REVIEW'
  | 'PULL_REQUEST_REVIEW_THREAD'
  | 'PULL_REQUEST_REVISION_MARKER'
  | 'READY_FOR_REVIEW_EVENT'
  | 'REFERENCED_EVENT'
  | 'REMOVED_FROM_MERGE_QUEUE_EVENT'
  | 'REMOVED_FROM_PROJECT_EVENT'
  | 'RENAMED_TITLE_EVENT'
  | 'REOPENED_EVENT'
  | 'REVIEW_DISMISSED_EVENT'
  | 'REVIEW_REQUESTED_EVENT'
  | 'REVIEW_REQUEST_REMOVED_EVENT'
  | 'SUBSCRIBED_EVENT'
  | 'TRANSFERRED_EVENT'
  | 'UNASSIGNED_EVENT'
  | 'UNLABELED_EVENT'
  | 'UNLOCKED_EVENT'
  | 'UNMARKED_AS_DUPLICATE_EVENT'
  | 'UNPINNED_EVENT'
  | 'UNSUBSCRIBED_EVENT'
  | 'USER_BLOCKED_EVENT';

export type PullRequestUpdateState =
  | 'CLOSED'
  | 'OPEN';

export type ReactionContent =
  | 'CONFUSED'
  | 'EYES'
  | 'HEART'
  | 'HOORAY'
  | 'LAUGH'
  | 'ROCKET'
  | 'THUMBS_DOWN'
  | 'THUMBS_UP';

export type ReactionOrder = {
  direction: OrderDirection;
  field: ReactionOrderField;
};

export type ReactionOrderField =
  | 'CREATED_AT';

export type RefOrder = {
  direction: OrderDirection;
  field: RefOrderField;
};

export type RefOrderField =
  | 'ALPHABETICAL'
  | 'TAG_COMMIT_DATE';

export type RegenerateEnterpriseIdentityProviderRecoveryCodesInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
};

export type RegenerateVerifiableDomainTokenInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type RejectDeploymentsInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  comment: InputMaybe<Scalars['String']>;
  environmentIds: Array<Scalars['ID']>;
  workflowRunId: Scalars['ID'];
};

export type ReleaseOrder = {
  direction: OrderDirection;
  field: ReleaseOrderField;
};

export type ReleaseOrderField =
  | 'CREATED_AT'
  | 'NAME';

export type RemoveAssigneesFromAssignableInput = {
  assignableId: Scalars['ID'];
  assigneeIds: Array<Scalars['ID']>;
  clientMutationId: InputMaybe<Scalars['String']>;
};

export type RemoveEnterpriseAdminInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
};

export type RemoveEnterpriseIdentityProviderInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
};

export type RemoveEnterpriseMemberInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RemoveEnterpriseOrganizationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  organizationId: Scalars['ID'];
};

export type RemoveEnterpriseSupportEntitlementInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
};

export type RemoveLabelsFromLabelableInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  labelIds: Array<Scalars['ID']>;
  labelableId: Scalars['ID'];
};

export type RemoveOutsideCollaboratorInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type RemoveReactionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  content: ReactionContent;
  subjectId: Scalars['ID'];
};

export type RemoveStarInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  starrableId: Scalars['ID'];
};

export type RemoveUpvoteInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  subjectId: Scalars['ID'];
};

export type ReopenIssueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  issueId: Scalars['ID'];
};

export type ReopenPullRequestInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestId: Scalars['ID'];
};

export type RepoAccessAuditEntryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type RepoAddMemberAuditEntryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type RepoArchivedAuditEntryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type RepoChangeMergeSettingAuditEntryMergeType =
  | 'MERGE'
  | 'REBASE'
  | 'SQUASH';

export type RepoCreateAuditEntryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type RepoDestroyAuditEntryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type RepoRemoveMemberAuditEntryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type ReportedContentClassifiers =
  | 'ABUSE'
  | 'DUPLICATE'
  | 'OFF_TOPIC'
  | 'OUTDATED'
  | 'RESOLVED'
  | 'SPAM';

export type RepositoryAffiliation =
  | 'COLLABORATOR'
  | 'ORGANIZATION_MEMBER'
  | 'OWNER';

export type RepositoryContributionType =
  | 'COMMIT'
  | 'ISSUE'
  | 'PULL_REQUEST'
  | 'PULL_REQUEST_REVIEW'
  | 'REPOSITORY';

export type RepositoryInteractionLimit =
  | 'COLLABORATORS_ONLY'
  | 'CONTRIBUTORS_ONLY'
  | 'EXISTING_USERS'
  | 'NO_LIMIT';

export type RepositoryInteractionLimitExpiry =
  | 'ONE_DAY'
  | 'ONE_MONTH'
  | 'ONE_WEEK'
  | 'SIX_MONTHS'
  | 'THREE_DAYS';

export type RepositoryInteractionLimitOrigin =
  | 'ORGANIZATION'
  | 'REPOSITORY'
  | 'USER';

export type RepositoryInvitationOrder = {
  direction: OrderDirection;
  field: RepositoryInvitationOrderField;
};

export type RepositoryInvitationOrderField =
  | 'CREATED_AT';

export type RepositoryLockReason =
  | 'BILLING'
  | 'MIGRATING'
  | 'MOVING'
  | 'RENAME'
  | 'TRADE_RESTRICTION';

export type RepositoryMigrationOrder = {
  direction: RepositoryMigrationOrderDirection;
  field: RepositoryMigrationOrderField;
};

export type RepositoryMigrationOrderDirection =
  | 'ASC'
  | 'DESC';

export type RepositoryMigrationOrderField =
  | 'CREATED_AT';

export type RepositoryOrder = {
  direction: OrderDirection;
  field: RepositoryOrderField;
};

export type RepositoryOrderField =
  | 'CREATED_AT'
  | 'NAME'
  | 'PUSHED_AT'
  | 'STARGAZERS'
  | 'UPDATED_AT';

export type RepositoryPermission =
  | 'ADMIN'
  | 'MAINTAIN'
  | 'READ'
  | 'TRIAGE'
  | 'WRITE';

export type RepositoryPrivacy =
  | 'PRIVATE'
  | 'PUBLIC';

export type RepositoryVisibility =
  | 'INTERNAL'
  | 'PRIVATE'
  | 'PUBLIC';

export type RepositoryVulnerabilityAlertDependencyScope =
  | 'DEVELOPMENT'
  | 'RUNTIME';

export type RepositoryVulnerabilityAlertState =
  | 'DISMISSED'
  | 'FIXED'
  | 'OPEN';

export type RequestReviewsInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestId: Scalars['ID'];
  teamIds: InputMaybe<Array<Scalars['ID']>>;
  union: InputMaybe<Scalars['Boolean']>;
  userIds: InputMaybe<Array<Scalars['ID']>>;
};

export type RequestableCheckStatusState =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PENDING'
  | 'QUEUED'
  | 'WAITING';

export type RequiredStatusCheckInput = {
  appId: InputMaybe<Scalars['ID']>;
  context: Scalars['String'];
};

export type RerequestCheckSuiteInput = {
  checkSuiteId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
};

export type ResolveReviewThreadInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  threadId: Scalars['ID'];
};

export type RetireSponsorsTierInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  tierId: Scalars['ID'];
};

export type RevertPullRequestInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  draft: InputMaybe<Scalars['Boolean']>;
  pullRequestId: Scalars['ID'];
  title: InputMaybe<Scalars['String']>;
};

export type RevokeEnterpriseOrganizationsMigratorRoleInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
};

export type RevokeMigratorRoleInput = {
  actor: Scalars['String'];
  actorType: ActorType;
  clientMutationId: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
};

export type RoleInOrganization =
  | 'DIRECT_MEMBER'
  | 'OWNER'
  | 'UNAFFILIATED';

export type SamlDigestAlgorithm =
  | 'SHA1'
  | 'SHA256'
  | 'SHA384'
  | 'SHA512';

export type SamlSignatureAlgorithm =
  | 'RSA_SHA1'
  | 'RSA_SHA256'
  | 'RSA_SHA384'
  | 'RSA_SHA512';

export type SavedReplyOrder = {
  direction: OrderDirection;
  field: SavedReplyOrderField;
};

export type SavedReplyOrderField =
  | 'UPDATED_AT';

export type SearchType =
  | 'DISCUSSION'
  | 'ISSUE'
  | 'REPOSITORY'
  | 'USER';

export type SecurityAdvisoryClassification =
  | 'GENERAL'
  | 'MALWARE';

export type SecurityAdvisoryEcosystem =
  | 'ACTIONS'
  | 'COMPOSER'
  | 'ERLANG'
  | 'GO'
  | 'MAVEN'
  | 'NPM'
  | 'NUGET'
  | 'PIP'
  | 'PUB'
  | 'RUBYGEMS'
  | 'RUST';

export type SecurityAdvisoryIdentifierFilter = {
  type: SecurityAdvisoryIdentifierType;
  value: Scalars['String'];
};

export type SecurityAdvisoryIdentifierType =
  | 'CVE'
  | 'GHSA';

export type SecurityAdvisoryOrder = {
  direction: OrderDirection;
  field: SecurityAdvisoryOrderField;
};

export type SecurityAdvisoryOrderField =
  | 'PUBLISHED_AT'
  | 'UPDATED_AT';

export type SecurityAdvisorySeverity =
  | 'CRITICAL'
  | 'HIGH'
  | 'LOW'
  | 'MODERATE';

export type SecurityVulnerabilityOrder = {
  direction: OrderDirection;
  field: SecurityVulnerabilityOrderField;
};

export type SecurityVulnerabilityOrderField =
  | 'UPDATED_AT';

export type SetEnterpriseIdentityProviderInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  digestMethod: SamlDigestAlgorithm;
  enterpriseId: Scalars['ID'];
  idpCertificate: Scalars['String'];
  issuer: InputMaybe<Scalars['String']>;
  signatureMethod: SamlSignatureAlgorithm;
  ssoUrl: Scalars['URI'];
};

export type SetOrganizationInteractionLimitInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  expiry: InputMaybe<RepositoryInteractionLimitExpiry>;
  limit: RepositoryInteractionLimit;
  organizationId: Scalars['ID'];
};

export type SetRepositoryInteractionLimitInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  expiry: InputMaybe<RepositoryInteractionLimitExpiry>;
  limit: RepositoryInteractionLimit;
  repositoryId: Scalars['ID'];
};

export type SetUserInteractionLimitInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  expiry: InputMaybe<RepositoryInteractionLimitExpiry>;
  limit: RepositoryInteractionLimit;
  userId: Scalars['ID'];
};

export type SponsorOrder = {
  direction: OrderDirection;
  field: SponsorOrderField;
};

export type SponsorOrderField =
  | 'LOGIN'
  | 'RELEVANCE';

export type SponsorableOrder = {
  direction: OrderDirection;
  field: SponsorableOrderField;
};

export type SponsorableOrderField =
  | 'LOGIN';

export type SponsorsActivityAction =
  | 'CANCELLED_SPONSORSHIP'
  | 'NEW_SPONSORSHIP'
  | 'PENDING_CHANGE'
  | 'REFUND'
  | 'SPONSOR_MATCH_DISABLED'
  | 'TIER_CHANGE';

export type SponsorsActivityOrder = {
  direction: OrderDirection;
  field: SponsorsActivityOrderField;
};

export type SponsorsActivityOrderField =
  | 'TIMESTAMP';

export type SponsorsActivityPeriod =
  | 'ALL'
  | 'DAY'
  | 'MONTH'
  | 'WEEK';

export type SponsorsCountryOrRegionCode =
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

export type SponsorsGoalKind =
  | 'MONTHLY_SPONSORSHIP_AMOUNT'
  | 'TOTAL_SPONSORS_COUNT';

export type SponsorsListingFeaturedItemFeatureableType =
  | 'REPOSITORY'
  | 'USER';

export type SponsorsTierOrder = {
  direction: OrderDirection;
  field: SponsorsTierOrderField;
};

export type SponsorsTierOrderField =
  | 'CREATED_AT'
  | 'MONTHLY_PRICE_IN_CENTS';

export type SponsorshipNewsletterOrder = {
  direction: OrderDirection;
  field: SponsorshipNewsletterOrderField;
};

export type SponsorshipNewsletterOrderField =
  | 'CREATED_AT';

export type SponsorshipOrder = {
  direction: OrderDirection;
  field: SponsorshipOrderField;
};

export type SponsorshipOrderField =
  | 'CREATED_AT';

export type SponsorshipPrivacy =
  | 'PRIVATE'
  | 'PUBLIC';

export type SquashMergeCommitMessage =
  | 'BLANK'
  | 'COMMIT_MESSAGES'
  | 'PR_BODY';

export type SquashMergeCommitTitle =
  | 'COMMIT_OR_PR_TITLE'
  | 'PR_TITLE';

export type StarOrder = {
  direction: OrderDirection;
  field: StarOrderField;
};

export type StarOrderField =
  | 'STARRED_AT';

export type StartOrganizationMigrationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  sourceAccessToken: Scalars['String'];
  sourceOrgUrl: Scalars['URI'];
  targetEnterpriseId: Scalars['ID'];
  targetOrgName: Scalars['String'];
};

export type StartRepositoryMigrationInput = {
  accessToken: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  continueOnError: InputMaybe<Scalars['Boolean']>;
  gitArchiveUrl: InputMaybe<Scalars['String']>;
  githubPat: InputMaybe<Scalars['String']>;
  lockSource: InputMaybe<Scalars['Boolean']>;
  metadataArchiveUrl: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
  repositoryName: Scalars['String'];
  skipReleases: InputMaybe<Scalars['Boolean']>;
  sourceId: Scalars['ID'];
  sourceRepositoryUrl: Scalars['URI'];
  targetRepoVisibility: InputMaybe<Scalars['String']>;
};

export type StatusState =
  | 'ERROR'
  | 'EXPECTED'
  | 'FAILURE'
  | 'PENDING'
  | 'SUCCESS';

export type SubmitPullRequestReviewInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  event: PullRequestReviewEvent;
  pullRequestId: InputMaybe<Scalars['ID']>;
  pullRequestReviewId: InputMaybe<Scalars['ID']>;
};

export type SubscriptionState =
  | 'IGNORED'
  | 'SUBSCRIBED'
  | 'UNSUBSCRIBED';

export type TeamDiscussionCommentOrder = {
  direction: OrderDirection;
  field: TeamDiscussionCommentOrderField;
};

export type TeamDiscussionCommentOrderField =
  | 'NUMBER';

export type TeamDiscussionOrder = {
  direction: OrderDirection;
  field: TeamDiscussionOrderField;
};

export type TeamDiscussionOrderField =
  | 'CREATED_AT';

export type TeamMemberOrder = {
  direction: OrderDirection;
  field: TeamMemberOrderField;
};

export type TeamMemberOrderField =
  | 'CREATED_AT'
  | 'LOGIN';

export type TeamMemberRole =
  | 'MAINTAINER'
  | 'MEMBER';

export type TeamMembershipType =
  | 'ALL'
  | 'CHILD_TEAM'
  | 'IMMEDIATE';

export type TeamOrder = {
  direction: OrderDirection;
  field: TeamOrderField;
};

export type TeamOrderField =
  | 'NAME';

export type TeamPrivacy =
  | 'SECRET'
  | 'VISIBLE';

export type TeamRepositoryOrder = {
  direction: OrderDirection;
  field: TeamRepositoryOrderField;
};

export type TeamRepositoryOrderField =
  | 'CREATED_AT'
  | 'NAME'
  | 'PERMISSION'
  | 'PUSHED_AT'
  | 'STARGAZERS'
  | 'UPDATED_AT';

export type TeamRole =
  | 'ADMIN'
  | 'MEMBER';

export type TopicSuggestionDeclineReason =
  | 'NOT_RELEVANT'
  | 'PERSONAL_PREFERENCE'
  | 'TOO_GENERAL'
  | 'TOO_SPECIFIC';

export type TrackedIssueStates =
  | 'CLOSED'
  | 'OPEN';

export type TransferEnterpriseOrganizationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  destinationEnterpriseId: Scalars['ID'];
  organizationId: Scalars['ID'];
};

export type TransferIssueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  createLabelsIfMissing: InputMaybe<Scalars['Boolean']>;
  issueId: Scalars['ID'];
  repositoryId: Scalars['ID'];
};

export type UnarchiveProjectV2ItemInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  itemId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export type UnarchiveRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
};

export type UnfollowOrganizationInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
};

export type UnfollowUserInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type UnlinkProjectV2FromRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  repositoryId: Scalars['ID'];
};

export type UnlinkProjectV2FromTeamInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type UnlinkRepositoryFromProjectInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  repositoryId: Scalars['ID'];
};

export type UnlockLockableInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  lockableId: Scalars['ID'];
};

export type UnmarkDiscussionCommentAsAnswerInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UnmarkFileAsViewedInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  path: Scalars['String'];
  pullRequestId: Scalars['ID'];
};

export type UnmarkIssueAsDuplicateInput = {
  canonicalId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
  duplicateId: Scalars['ID'];
};

export type UnminimizeCommentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  subjectId: Scalars['ID'];
};

export type UnpinIssueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  issueId: Scalars['ID'];
};

export type UnresolveReviewThreadInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  threadId: Scalars['ID'];
};

export type UpdateBranchProtectionRuleInput = {
  allowsDeletions: InputMaybe<Scalars['Boolean']>;
  allowsForcePushes: InputMaybe<Scalars['Boolean']>;
  blocksCreations: InputMaybe<Scalars['Boolean']>;
  branchProtectionRuleId: Scalars['ID'];
  bypassForcePushActorIds: InputMaybe<Array<Scalars['ID']>>;
  bypassPullRequestActorIds: InputMaybe<Array<Scalars['ID']>>;
  clientMutationId: InputMaybe<Scalars['String']>;
  dismissesStaleReviews: InputMaybe<Scalars['Boolean']>;
  isAdminEnforced: InputMaybe<Scalars['Boolean']>;
  lockAllowsFetchAndMerge: InputMaybe<Scalars['Boolean']>;
  lockBranch: InputMaybe<Scalars['Boolean']>;
  pattern: InputMaybe<Scalars['String']>;
  pushActorIds: InputMaybe<Array<Scalars['ID']>>;
  requireLastPushApproval: InputMaybe<Scalars['Boolean']>;
  requiredApprovingReviewCount: InputMaybe<Scalars['Int']>;
  requiredDeploymentEnvironments: InputMaybe<Array<Scalars['String']>>;
  requiredStatusCheckContexts: InputMaybe<Array<Scalars['String']>>;
  requiredStatusChecks: InputMaybe<Array<RequiredStatusCheckInput>>;
  requiresApprovingReviews: InputMaybe<Scalars['Boolean']>;
  requiresCodeOwnerReviews: InputMaybe<Scalars['Boolean']>;
  requiresCommitSignatures: InputMaybe<Scalars['Boolean']>;
  requiresConversationResolution: InputMaybe<Scalars['Boolean']>;
  requiresDeployments: InputMaybe<Scalars['Boolean']>;
  requiresLinearHistory: InputMaybe<Scalars['Boolean']>;
  requiresStatusChecks: InputMaybe<Scalars['Boolean']>;
  requiresStrictStatusChecks: InputMaybe<Scalars['Boolean']>;
  restrictsPushes: InputMaybe<Scalars['Boolean']>;
  restrictsReviewDismissals: InputMaybe<Scalars['Boolean']>;
  reviewDismissalActorIds: InputMaybe<Array<Scalars['ID']>>;
};

export type UpdateCheckRunInput = {
  actions: InputMaybe<Array<CheckRunAction>>;
  checkRunId: Scalars['ID'];
  clientMutationId: InputMaybe<Scalars['String']>;
  completedAt: InputMaybe<Scalars['DateTime']>;
  conclusion: InputMaybe<CheckConclusionState>;
  detailsUrl: InputMaybe<Scalars['URI']>;
  externalId: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  output: InputMaybe<CheckRunOutput>;
  repositoryId: Scalars['ID'];
  startedAt: InputMaybe<Scalars['DateTime']>;
  status: InputMaybe<RequestableCheckStatusState>;
};

export type UpdateCheckSuitePreferencesInput = {
  autoTriggerPreferences: Array<CheckSuiteAutoTriggerPreference>;
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
};

export type UpdateDiscussionCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  commentId: Scalars['ID'];
};

export type UpdateDiscussionInput = {
  body: InputMaybe<Scalars['String']>;
  categoryId: InputMaybe<Scalars['ID']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  discussionId: Scalars['ID'];
  title: InputMaybe<Scalars['String']>;
};

export type UpdateEnterpriseAdministratorRoleInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  login: Scalars['String'];
  role: EnterpriseAdministratorRole;
};

export type UpdateEnterpriseAllowPrivateRepositoryForkingSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  policyValue: InputMaybe<EnterpriseAllowPrivateRepositoryForkingPolicyValue>;
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseDefaultRepositoryPermissionSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseDefaultRepositoryPermissionSettingValue;
};

export type UpdateEnterpriseMembersCanChangeRepositoryVisibilitySettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseMembersCanCreateRepositoriesSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  membersCanCreateInternalRepositories: InputMaybe<Scalars['Boolean']>;
  membersCanCreatePrivateRepositories: InputMaybe<Scalars['Boolean']>;
  membersCanCreatePublicRepositories: InputMaybe<Scalars['Boolean']>;
  membersCanCreateRepositoriesPolicyEnabled: InputMaybe<Scalars['Boolean']>;
  settingValue: InputMaybe<EnterpriseMembersCanCreateRepositoriesSettingValue>;
};

export type UpdateEnterpriseMembersCanDeleteIssuesSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseMembersCanDeleteRepositoriesSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseMembersCanInviteCollaboratorsSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseMembersCanMakePurchasesSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseMembersCanMakePurchasesSettingValue;
};

export type UpdateEnterpriseMembersCanUpdateProtectedBranchesSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseMembersCanViewDependencyInsightsSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseOrganizationProjectsSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseOwnerOrganizationRoleInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  organizationId: Scalars['ID'];
  organizationRole: RoleInOrganization;
};

export type UpdateEnterpriseProfileInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  location: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  websiteUrl: InputMaybe<Scalars['String']>;
};

export type UpdateEnterpriseRepositoryProjectsSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseTeamDiscussionsSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledDisabledSettingValue;
};

export type UpdateEnterpriseTwoFactorAuthenticationRequiredSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  enterpriseId: Scalars['ID'];
  settingValue: EnterpriseEnabledSettingValue;
};

export type UpdateEnvironmentInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  environmentId: Scalars['ID'];
  reviewers: InputMaybe<Array<Scalars['ID']>>;
  waitTimer: InputMaybe<Scalars['Int']>;
};

export type UpdateIpAllowListEnabledSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
  settingValue: IpAllowListEnabledSettingValue;
};

export type UpdateIpAllowListEntryInput = {
  allowListValue: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  ipAllowListEntryId: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: InputMaybe<Scalars['String']>;
};

export type UpdateIpAllowListForInstalledAppsEnabledSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
  settingValue: IpAllowListForInstalledAppsEnabledSettingValue;
};

export type UpdateIssueCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateIssueInput = {
  assigneeIds: InputMaybe<Array<Scalars['ID']>>;
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  labelIds: InputMaybe<Array<Scalars['ID']>>;
  milestoneId: InputMaybe<Scalars['ID']>;
  projectIds: InputMaybe<Array<Scalars['ID']>>;
  state: InputMaybe<IssueState>;
  title: InputMaybe<Scalars['String']>;
};

export type UpdateNotificationRestrictionSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  ownerId: Scalars['ID'];
  settingValue: NotificationRestrictionSettingValue;
};

export type UpdateOrganizationAllowPrivateRepositoryForkingSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  forkingEnabled: Scalars['Boolean'];
  organizationId: Scalars['ID'];
};

export type UpdateOrganizationWebCommitSignoffSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  organizationId: Scalars['ID'];
  webCommitSignoffRequired: Scalars['Boolean'];
};

export type UpdateProjectCardInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  isArchived: InputMaybe<Scalars['Boolean']>;
  note: InputMaybe<Scalars['String']>;
  projectCardId: Scalars['ID'];
};

export type UpdateProjectColumnInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectColumnId: Scalars['ID'];
};

export type UpdateProjectInput = {
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  projectId: Scalars['ID'];
  public: InputMaybe<Scalars['Boolean']>;
  state: InputMaybe<ProjectState>;
};

export type UpdateProjectV2DraftIssueInput = {
  assigneeIds: InputMaybe<Array<Scalars['ID']>>;
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  draftIssueId: Scalars['ID'];
  title: InputMaybe<Scalars['String']>;
};

export type UpdateProjectV2Input = {
  clientMutationId: InputMaybe<Scalars['String']>;
  closed: InputMaybe<Scalars['Boolean']>;
  projectId: Scalars['ID'];
  public: InputMaybe<Scalars['Boolean']>;
  readme: InputMaybe<Scalars['String']>;
  shortDescription: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

export type UpdateProjectV2ItemFieldValueInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  fieldId: Scalars['ID'];
  itemId: Scalars['ID'];
  projectId: Scalars['ID'];
  value: ProjectV2FieldValue;
};

export type UpdateProjectV2ItemPositionInput = {
  afterId: InputMaybe<Scalars['ID']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  itemId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export type UpdatePullRequestBranchInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  expectedHeadOid: InputMaybe<Scalars['GitObjectID']>;
  pullRequestId: Scalars['ID'];
};

export type UpdatePullRequestInput = {
  assigneeIds: InputMaybe<Array<Scalars['ID']>>;
  baseRefName: InputMaybe<Scalars['String']>;
  body: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  labelIds: InputMaybe<Array<Scalars['ID']>>;
  maintainerCanModify: InputMaybe<Scalars['Boolean']>;
  milestoneId: InputMaybe<Scalars['ID']>;
  projectIds: InputMaybe<Array<Scalars['ID']>>;
  pullRequestId: Scalars['ID'];
  state: InputMaybe<PullRequestUpdateState>;
  title: InputMaybe<Scalars['String']>;
};

export type UpdatePullRequestReviewCommentInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestReviewCommentId: Scalars['ID'];
};

export type UpdatePullRequestReviewInput = {
  body: Scalars['String'];
  clientMutationId: InputMaybe<Scalars['String']>;
  pullRequestReviewId: Scalars['ID'];
};

export type UpdateRefInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  force: InputMaybe<Scalars['Boolean']>;
  oid: Scalars['GitObjectID'];
  refId: Scalars['ID'];
};

export type UpdateRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  hasDiscussionsEnabled: InputMaybe<Scalars['Boolean']>;
  hasIssuesEnabled: InputMaybe<Scalars['Boolean']>;
  hasProjectsEnabled: InputMaybe<Scalars['Boolean']>;
  hasWikiEnabled: InputMaybe<Scalars['Boolean']>;
  homepageUrl: InputMaybe<Scalars['URI']>;
  name: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
  template: InputMaybe<Scalars['Boolean']>;
};

export type UpdateRepositoryWebCommitSignoffSettingInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
  webCommitSignoffRequired: Scalars['Boolean'];
};

export type UpdateSponsorshipPreferencesInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  privacyLevel: InputMaybe<SponsorshipPrivacy>;
  receiveEmails: InputMaybe<Scalars['Boolean']>;
  sponsorId: InputMaybe<Scalars['ID']>;
  sponsorLogin: InputMaybe<Scalars['String']>;
  sponsorableId: InputMaybe<Scalars['ID']>;
  sponsorableLogin: InputMaybe<Scalars['String']>;
};

export type UpdateSubscriptionInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  state: SubscriptionState;
  subscribableId: Scalars['ID'];
};

export type UpdateTeamDiscussionCommentInput = {
  body: Scalars['String'];
  bodyVersion: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateTeamDiscussionInput = {
  body: InputMaybe<Scalars['String']>;
  bodyVersion: InputMaybe<Scalars['String']>;
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  pinned: InputMaybe<Scalars['Boolean']>;
  title: InputMaybe<Scalars['String']>;
};

export type UpdateTeamsRepositoryInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  permission: RepositoryPermission;
  repositoryId: Scalars['ID'];
  teamIds: Array<Scalars['ID']>;
};

export type UpdateTopicsInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  repositoryId: Scalars['ID'];
  topicNames: Array<Scalars['String']>;
};

export type UserBlockDuration =
  | 'ONE_DAY'
  | 'ONE_MONTH'
  | 'ONE_WEEK'
  | 'PERMANENT'
  | 'THREE_DAYS';

export type UserStatusOrder = {
  direction: OrderDirection;
  field: UserStatusOrderField;
};

export type UserStatusOrderField =
  | 'UPDATED_AT';

export type VerifiableDomainOrder = {
  direction: OrderDirection;
  field: VerifiableDomainOrderField;
};

export type VerifiableDomainOrderField =
  | 'CREATED_AT'
  | 'DOMAIN';

export type VerifyVerifiableDomainInput = {
  clientMutationId: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type WorkflowRunOrder = {
  direction: OrderDirection;
  field: WorkflowRunOrderField;
};

export type WorkflowRunOrderField =
  | 'CREATED_AT';

export type CheckRunFragment = { __typename: 'CheckRun', title: string | null, text: string | null, summary: string | null, status: CheckStatusState, conclusion: CheckConclusionState | null, name: string };

export type CommitCheckSuitesFragment = { __typename: 'Commit', checkSuites: { __typename: 'CheckSuiteConnection', nodes: Array<{ __typename: 'CheckSuite', conclusion: CheckConclusionState | null, workflowRun: { __typename: 'WorkflowRun', createdAt: any, updatedAt: any, runNumber: number, url: any, workflow: { __typename: 'Workflow', id: string, databaseId: number | null, name: string } } | null, creator: { __typename: 'User', login: string, avatarUrl: any } | null, checkRuns: { __typename: 'CheckRunConnection', nodes: Array<{ __typename: 'CheckRun', title: string | null, text: string | null, summary: string | null, status: CheckStatusState, conclusion: CheckConclusionState | null, name: string } | null> | null } | null } | null> | null } | null };

export type GetPullRequestQueryVariables = Exact<{
  name: Scalars['String'];
  owner: Scalars['String'];
  number: Scalars['Int'];
  includeStatus?: InputMaybe<Scalars['Boolean']>;
  includeReviews?: InputMaybe<Scalars['Boolean']>;
  includeLabels?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetPullRequestQuery = { __typename: 'Query', repository: { __typename: 'Repository', pullRequest: { __typename: 'PullRequest', id: string, number: number, title: string, url: any, state: PullRequestState, merged: boolean, reviewDecision: PullRequestReviewDecision | null, repository: { __typename: 'Repository', name: string, url: any, databaseId: number | null }, headRef: { __typename: 'Ref', name: string } | null, commits: { __typename: 'PullRequestCommitConnection', nodes: Array<{ __typename: 'PullRequestCommit', commit: { __typename: 'Commit', oid: any, message: string, statusCheckRollup: { __typename: 'StatusCheckRollup', state: StatusState } | null, status: { __typename: 'Status', contexts: Array<{ __typename: 'StatusContext', context: string, description: string | null, targetUrl: any | null, avatarUrl: any | null, state: StatusState }> } | null, checkSuites: { __typename: 'CheckSuiteConnection', nodes: Array<{ __typename: 'CheckSuite', conclusion: CheckConclusionState | null, workflowRun: { __typename: 'WorkflowRun', createdAt: any, updatedAt: any, runNumber: number, url: any, workflow: { __typename: 'Workflow', id: string, databaseId: number | null, name: string } } | null, creator: { __typename: 'User', login: string, avatarUrl: any } | null, checkRuns: { __typename: 'CheckRunConnection', nodes: Array<{ __typename: 'CheckRun', title: string | null, text: string | null, summary: string | null, status: CheckStatusState, conclusion: CheckConclusionState | null, name: string } | null> | null } | null } | null> | null } | null } } | null> | null }, latestReviews: { __typename: 'PullRequestReviewConnection', nodes: Array<{ __typename: 'PullRequestReview', state: PullRequestReviewState } | null> | null } | null, labels: { __typename: 'LabelConnection', nodes: Array<{ __typename: 'Label', color: string, name: string } | null> | null } | null } | null } | null };

export type PrCommitFragment = { __typename: 'PullRequest', commits: { __typename: 'PullRequestCommitConnection', nodes: Array<{ __typename: 'PullRequestCommit', commit: { __typename: 'Commit', oid: any, message: string, statusCheckRollup: { __typename: 'StatusCheckRollup', state: StatusState } | null, status: { __typename: 'Status', contexts: Array<{ __typename: 'StatusContext', context: string, description: string | null, targetUrl: any | null, avatarUrl: any | null, state: StatusState }> } | null, checkSuites: { __typename: 'CheckSuiteConnection', nodes: Array<{ __typename: 'CheckSuite', conclusion: CheckConclusionState | null, workflowRun: { __typename: 'WorkflowRun', createdAt: any, updatedAt: any, runNumber: number, url: any, workflow: { __typename: 'Workflow', id: string, databaseId: number | null, name: string } } | null, creator: { __typename: 'User', login: string, avatarUrl: any } | null, checkRuns: { __typename: 'CheckRunConnection', nodes: Array<{ __typename: 'CheckRun', title: string | null, text: string | null, summary: string | null, status: CheckStatusState, conclusion: CheckConclusionState | null, name: string } | null> | null } | null } | null> | null } | null } } | null> | null } };

export type PrForLinkFragment = { __typename: 'PullRequest', id: string, number: number, title: string, url: any, state: PullRequestState, merged: boolean, repository: { __typename: 'Repository', name: string, url: any, databaseId: number | null }, headRef: { __typename: 'Ref', name: string } | null };

export type PrForReviewDecisionFragment = { __typename: 'PullRequest', reviewDecision: PullRequestReviewDecision | null, latestReviews: { __typename: 'PullRequestReviewConnection', nodes: Array<{ __typename: 'PullRequestReview', state: PullRequestReviewState } | null> | null } | null };

export type PrLabelsFragment = { __typename: 'PullRequest', labels: { __typename: 'LabelConnection', nodes: Array<{ __typename: 'Label', color: string, name: string } | null> | null } | null };

export type PrCommitStatusFragment = { __typename: 'Commit', statusCheckRollup: { __typename: 'StatusCheckRollup', state: StatusState } | null, status: { __typename: 'Status', contexts: Array<{ __typename: 'StatusContext', context: string, description: string | null, targetUrl: any | null, avatarUrl: any | null, state: StatusState }> } | null };

export type PrStatusContextFragment = { __typename: 'StatusContext', context: string, description: string | null, targetUrl: any | null, avatarUrl: any | null, state: StatusState };

export type RepoFragmentFragment = { __typename: 'Repository', nameWithOwner: string, refs: { __typename: 'RefConnection', edges: Array<{ __typename: 'RefEdge', node: { __typename: 'Ref', name: string, target: { __typename: 'Blob', oid: any, commitUrl: any } | { __typename: 'Commit', oid: any, commitUrl: any } | { __typename: 'Tag', oid: any, commitUrl: any } | { __typename: 'Tree', oid: any, commitUrl: any } | null } | null } | null> | null } | null };

export type BranchFragmentFragment = { __typename: 'Ref', name: string, target: { __typename: 'Blob', oid: any, commitUrl: any } | { __typename: 'Commit', oid: any, commitUrl: any } | { __typename: 'Tag', oid: any, commitUrl: any } | { __typename: 'Tree', oid: any, commitUrl: any } | null };

export type SearchPullRequestQueryVariables = Exact<{
  searchQuery: Scalars['String'];
  count: Scalars['Int'];
  includeStatus?: InputMaybe<Scalars['Boolean']>;
  includeReviews?: InputMaybe<Scalars['Boolean']>;
  includeLabels?: InputMaybe<Scalars['Boolean']>;
}>;


export type SearchPullRequestQuery = { __typename: 'Query', search: { __typename: 'SearchResultItemConnection', edges: Array<{ __typename: 'SearchResultItemEdge', node: { __typename: 'App' } | { __typename: 'Discussion' } | { __typename: 'Issue' } | { __typename: 'MarketplaceListing' } | { __typename: 'Organization' } | { __typename: 'PullRequest', id: string, number: number, title: string, url: any, state: PullRequestState, merged: boolean, reviewDecision: PullRequestReviewDecision | null, repository: { __typename: 'Repository', name: string, url: any, databaseId: number | null }, headRef: { __typename: 'Ref', name: string } | null, commits: { __typename: 'PullRequestCommitConnection', nodes: Array<{ __typename: 'PullRequestCommit', commit: { __typename: 'Commit', oid: any, message: string, statusCheckRollup: { __typename: 'StatusCheckRollup', state: StatusState } | null, status: { __typename: 'Status', contexts: Array<{ __typename: 'StatusContext', context: string, description: string | null, targetUrl: any | null, avatarUrl: any | null, state: StatusState }> } | null, checkSuites: { __typename: 'CheckSuiteConnection', nodes: Array<{ __typename: 'CheckSuite', conclusion: CheckConclusionState | null, workflowRun: { __typename: 'WorkflowRun', createdAt: any, updatedAt: any, runNumber: number, url: any, workflow: { __typename: 'Workflow', id: string, databaseId: number | null, name: string } } | null, creator: { __typename: 'User', login: string, avatarUrl: any } | null, checkRuns: { __typename: 'CheckRunConnection', nodes: Array<{ __typename: 'CheckRun', title: string | null, text: string | null, summary: string | null, status: CheckStatusState, conclusion: CheckConclusionState | null, name: string } | null> | null } | null } | null> | null } | null } } | null> | null }, latestReviews: { __typename: 'PullRequestReviewConnection', nodes: Array<{ __typename: 'PullRequestReview', state: PullRequestReviewState } | null> | null } | null, labels: { __typename: 'LabelConnection', nodes: Array<{ __typename: 'Label', color: string, name: string } | null> | null } | null } | { __typename: 'Repository' } | { __typename: 'User' } | null } | null> | null } };

export const PrStatusContextFragmentDoc = `fragment PrStatusContext on StatusContext {
  context
  description
  targetUrl
  avatarUrl
  state
}` as unknown as DocumentNode<PrStatusContextFragment, unknown>;
export const PrCommitStatusFragmentDoc = `fragment PrCommitStatus on Commit {
  statusCheckRollup {
    state
  }
  status {
    contexts {
      ...PrStatusContext
    }
  }
}

fragment PrStatusContext on StatusContext {
  context
  description
  targetUrl
  avatarUrl
  state
}` as unknown as DocumentNode<PrCommitStatusFragment, unknown>;
export const CheckRunFragmentDoc = `fragment CheckRun on CheckRun {
  title
  text
  summary
  status
  conclusion
  name
}` as unknown as DocumentNode<CheckRunFragment, unknown>;
export const CommitCheckSuitesFragmentDoc = `fragment CommitCheckSuites on Commit {
  checkSuites(last: 1) {
    nodes {
      conclusion
      workflowRun {
        createdAt
        updatedAt
        runNumber
        url
        workflow {
          id
          databaseId
          name
        }
      }
      creator {
        ... on Actor {
          login
          avatarUrl(size: 32)
        }
      }
      checkRuns(last: 1) {
        nodes {
          ...CheckRun
        }
      }
    }
  }
}

fragment CheckRun on CheckRun {
  title
  text
  summary
  status
  conclusion
  name
}` as unknown as DocumentNode<CommitCheckSuitesFragment, unknown>;
export const PrCommitFragmentDoc = `fragment PrCommit on PullRequest {
  commits(last: 1) {
    nodes {
      commit {
        oid
        message
        ...PrCommitStatus
        ...CommitCheckSuites
      }
    }
  }
}

fragment PrStatusContext on StatusContext {
  context
  description
  targetUrl
  avatarUrl
  state
}

fragment CheckRun on CheckRun {
  title
  text
  summary
  status
  conclusion
  name
}

fragment PrCommitStatus on Commit {
  statusCheckRollup {
    state
  }
  status {
    contexts {
      ...PrStatusContext
    }
  }
}

fragment CommitCheckSuites on Commit {
  checkSuites(last: 1) {
    nodes {
      conclusion
      workflowRun {
        createdAt
        updatedAt
        runNumber
        url
        workflow {
          id
          databaseId
          name
        }
      }
      creator {
        ... on Actor {
          login
          avatarUrl(size: 32)
        }
      }
      checkRuns(last: 1) {
        nodes {
          ...CheckRun
        }
      }
    }
  }
}` as unknown as DocumentNode<PrCommitFragment, unknown>;
export const PrForLinkFragmentDoc = `fragment PrForLink on PullRequest {
  id
  number
  title
  url
  state
  merged
  repository {
    name
    url
    databaseId
  }
  headRef {
    name
  }
}` as unknown as DocumentNode<PrForLinkFragment, unknown>;
export const PrForReviewDecisionFragmentDoc = `fragment PrForReviewDecision on PullRequest {
  reviewDecision
  latestReviews(first: 5) {
    nodes {
      state
    }
  }
}` as unknown as DocumentNode<PrForReviewDecisionFragment, unknown>;
export const PrLabelsFragmentDoc = `fragment PrLabels on PullRequest {
  labels(first: 5) {
    nodes {
      color
      name
    }
  }
}` as unknown as DocumentNode<PrLabelsFragment, unknown>;
export const BranchFragmentFragmentDoc = `fragment BranchFragment on Ref {
  __typename
  name
  target {
    oid
    commitUrl
  }
}` as unknown as DocumentNode<BranchFragmentFragment, unknown>;
export const RepoFragmentFragmentDoc = `fragment RepoFragment on Repository {
  nameWithOwner
  refs(
    refPrefix: "refs/heads/"
    orderBy: {field: TAG_COMMIT_DATE, direction: ASC}
    first: 5
  ) {
    edges {
      node {
        ...BranchFragment
      }
    }
  }
}

fragment BranchFragment on Ref {
  __typename
  name
  target {
    oid
    commitUrl
  }
}` as unknown as DocumentNode<RepoFragmentFragment, unknown>;
export const GetPullRequestDocument = `query GetPullRequest($name: String!, $owner: String!, $number: Int!, $includeStatus: Boolean = false, $includeReviews: Boolean = false, $includeLabels: Boolean = false) {
  repository(name: $name, owner: $owner) {
    pullRequest(number: $number) {
      __typename
      ...PrForLink
      ...PrCommit @include(if: $includeStatus)
      ...PrForReviewDecision @include(if: $includeReviews)
      ...PrLabels @include(if: $includeLabels)
    }
  }
}

fragment PrStatusContext on StatusContext {
  context
  description
  targetUrl
  avatarUrl
  state
}

fragment PrCommitStatus on Commit {
  statusCheckRollup {
    state
  }
  status {
    contexts {
      ...PrStatusContext
    }
  }
}

fragment CheckRun on CheckRun {
  title
  text
  summary
  status
  conclusion
  name
}

fragment CommitCheckSuites on Commit {
  checkSuites(last: 1) {
    nodes {
      conclusion
      workflowRun {
        createdAt
        updatedAt
        runNumber
        url
        workflow {
          id
          databaseId
          name
        }
      }
      creator {
        ... on Actor {
          login
          avatarUrl(size: 32)
        }
      }
      checkRuns(last: 1) {
        nodes {
          ...CheckRun
        }
      }
    }
  }
}

fragment PrForLink on PullRequest {
  id
  number
  title
  url
  state
  merged
  repository {
    name
    url
    databaseId
  }
  headRef {
    name
  }
}

fragment PrCommit on PullRequest {
  commits(last: 1) {
    nodes {
      commit {
        oid
        message
        ...PrCommitStatus
        ...CommitCheckSuites
      }
    }
  }
}

fragment PrForReviewDecision on PullRequest {
  reviewDecision
  latestReviews(first: 5) {
    nodes {
      state
    }
  }
}

fragment PrLabels on PullRequest {
  labels(first: 5) {
    nodes {
      color
      name
    }
  }
}` as unknown as DocumentNode<GetPullRequestQuery, GetPullRequestQueryVariables>;
export const SearchPullRequestDocument = `query SearchPullRequest($searchQuery: String!, $count: Int!, $includeStatus: Boolean = false, $includeReviews: Boolean = false, $includeLabels: Boolean = false) {
  search(query: $searchQuery, type: ISSUE, first: $count) {
    edges {
      node {
        __typename
        ... on PullRequest {
          ...PrForLink
          ...PrCommit @include(if: $includeStatus)
          ...PrForReviewDecision @include(if: $includeReviews)
          ...PrLabels @include(if: $includeLabels)
        }
      }
    }
  }
}

fragment PrStatusContext on StatusContext {
  context
  description
  targetUrl
  avatarUrl
  state
}

fragment PrCommitStatus on Commit {
  statusCheckRollup {
    state
  }
  status {
    contexts {
      ...PrStatusContext
    }
  }
}

fragment CheckRun on CheckRun {
  title
  text
  summary
  status
  conclusion
  name
}

fragment CommitCheckSuites on Commit {
  checkSuites(last: 1) {
    nodes {
      conclusion
      workflowRun {
        createdAt
        updatedAt
        runNumber
        url
        workflow {
          id
          databaseId
          name
        }
      }
      creator {
        ... on Actor {
          login
          avatarUrl(size: 32)
        }
      }
      checkRuns(last: 1) {
        nodes {
          ...CheckRun
        }
      }
    }
  }
}

fragment PrForLink on PullRequest {
  id
  number
  title
  url
  state
  merged
  repository {
    name
    url
    databaseId
  }
  headRef {
    name
  }
}

fragment PrCommit on PullRequest {
  commits(last: 1) {
    nodes {
      commit {
        oid
        message
        ...PrCommitStatus
        ...CommitCheckSuites
      }
    }
  }
}

fragment PrForReviewDecision on PullRequest {
  reviewDecision
  latestReviews(first: 5) {
    nodes {
      state
    }
  }
}

fragment PrLabels on PullRequest {
  labels(first: 5) {
    nodes {
      color
      name
    }
  }
}` as unknown as DocumentNode<SearchPullRequestQuery, SearchPullRequestQueryVariables>;