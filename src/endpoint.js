import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

aha.on("hello", function (args) {
  return "Hello from server, " + args.name + "!";
});

aha.on("fetch_pull_details", async (args) => {
  const octokit = new Octokit({
    auth: Env.auth,
    userAgent: "myApp v1.2.3",
    log: console,
  });

  const { owner, repo, pull_number } = args;

  // TODO: Could probably do more of this in parallel.
  const { data: pullRequest } = await octokit.pulls.get({
    owner,
    repo,
    pull_number,
  });

  const { data: statuses } = await octokit.repos.getCombinedStatusForRef({
    owner,
    repo,
    ref: pullRequest.head.sha,
  });

  const { data: checks } = await octokit.checks.listForRef({
    owner,
    repo,
    ref: pullRequest.head.sha,
  });

  const { data: reviews } = await octokit.pulls.listReviews({
    owner,
    repo,
    pull_number,
  });

  const summarizedChecks = (checks, statuses) => {
    const checkSummary = checks.check_runs.map((run) => ({
      name: run.name,
      status: run.conclusion,
      url: run.details_url,
    }));

    const statusSummary = statuses.statuses.map((status) => ({
      name: status.context,
      status: status.state,
      url: status.target_url,
    }));

    return checkSummary.concat(statusSummary);
  };

  const summarizedReviews = reviews.map((review) => ({
    state: review.state,
    html_url: review.html_url,
  }));

  const details = {
    title: pullRequest.title,
    url: pullRequest.html_url,
    merged: pullRequest.merged,
    checks: summarizedChecks(checks, statuses),
    reviews: summarizedReviews,
  };

  return details;
});
