import {
  githubPullRequestEventToPrLink,
  githubPullRequestReviewEventToPrLink,
  githubPullRequestToActionLink,
  githubPullRequestToPrLink,
} from "./converters";

describe("githubPullRequestToPrLink", () => {
  it("converts to PrLink", () => {
    expect(
      githubPullRequestToPrLink({
        __typename: "PullRequest",
        headRef: { __typename: "Ref", name: "test-branch" },
        id: "1",
        merged: true,
        number: 1,
        repository: {
          __typename: "Repository",
          databaseId: 2,
          name: "repo",
          url: "https://example.net",
        },
        state: "CLOSED",
        title: "A Pr",
        url: "https://example.net",
      })
    ).toStrictEqual({
      id: 1,
      name: "A Pr",
      state: "merged",
      url: "https://example.net",
    });
  });
});

describe("githubPullRequestEventToPrLink", () => {
  it("converts to PrLink", () => {
    expect(
      githubPullRequestEventToPrLink({
        number: 1,
        title: "A Pr",
        merged: true,
        state: "closed",
        html_url: "https://example.net",
      } as any)
    ).toStrictEqual({
      id: 1,
      name: "A Pr",
      state: "merged",
      url: "https://example.net",
    });
  });
});

describe("githubPullRequestReviewEventToPrLink", () => {
  it("converts to PrLink", () => {
    expect(
      githubPullRequestReviewEventToPrLink({
        number: 1,
        title: "A Pr",
        merged_at: new Date().toISOString(),
        state: "closed",
        html_url: "https://example.net",
      } as any)
    ).toStrictEqual({
      id: 1,
      name: "A Pr",
      state: "merged",
      url: "https://example.net",
    });
  });
});

describe("githubPullRequestToActionLink", () => {
  it("converts to ActionLink", () => {
    const now = new Date().toISOString();

    expect(
      githubPullRequestToActionLink({
        __typename: "PullRequest",
        commits: {
          __typename: "PullRequestCommitConnection",
          nodes: [
            {
              __typename: "PullRequestCommit",
              commit: {
                __typename: "Commit",
                checkSuites: {
                  __typename: "CheckSuiteConnection",
                  nodes: [
                    {
                      __typename: "CheckSuite",
                      checkRuns: {
                        __typename: "CheckRunConnection",
                        nodes: [
                          {
                            __typename: "CheckRun",
                            conclusion: "SUCCESS",
                            name: "a checkrun",
                            status: "COMPLETED",
                            summary: "a checkrun summary",
                            text: "checkrun text",
                            title: "checkrun title",
                          },
                        ],
                      },
                      conclusion: "SUCCESS",
                      creator: {
                        __typename: "User",
                        avatarUrl: "https://example.net/user_avatar",
                        login: "userlogin",
                      },
                      workflowRun: {
                        __typename: "WorkflowRun",
                        createdAt: now,
                        runNumber: 1,
                        updatedAt: now,
                        url: "https://example.net/workflow_run",
                        workflow: {
                          __typename: "Workflow",
                          databaseId: 2,
                          id: "2",
                          name: "workflow name",
                        },
                      },
                    },
                  ],
                },
                message: "commit message",
                oid: "2abc",
                status: {
                  __typename: "Status",
                  contexts: [
                    {
                      __typename: "StatusContext",
                      avatarUrl: "https://example.net/status_avatar",
                      context: "context string",
                      description: "context description",
                      state: "SUCCESS",
                      targetUrl: "https://example.net/target",
                    },
                  ],
                },
                statusCheckRollup: {
                  __typename: "StatusCheckRollup",
                  state: "SUCCESS",
                },
              },
            },
          ],
        },
        headRef: { __typename: "Ref", name: "test-branch" },
        id: "1",
        merged: false,
        number: 1,
        repository: {
          __typename: "Repository",
          databaseId: 3,
          name: "repo",
          url: "https://example.net/repo",
        },
        state: "OPEN",
        title: "pr title",
        url: "https://example.net/pr",
      })
    ).toStrictEqual({
      project: { id: "3", name: "repo", url: "https://example.net/repo" },
      workflows: {
        "test-branch": {
          authorName: "userlogin",
          authorURL: "https://example.net/user_avatar",
          branch: "test-branch",
          buildNumber: "1",
          buildStatus: "success",
          commitHash: "2abc",
          commitMsg: "commit message",
          finishTime: now,
          id: 2,
          name: "workflow name",
          startTime: now,
          url: "https://example.net/workflow_run",
        },
      },
    });
  });
});
