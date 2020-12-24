import { h, render } from "https://cdn.pika.dev/preact@^10.4.4";
import { useState } from "https://cdn.pika.dev/preact@^10.4.4/hooks";
import htm from "https://cdn.pika.dev/htm@^3.0.4";
import classnames from "https://cdn.pika.dev/classnames@^2.2.6";

const html = htm.bind(h);

function Styles() {
  return html` <style>
    .github__title {
      display: flex;
    }
    .github__title,
    .github__reviews-summary {
      margin-bottom: 0.5em;
    }
    .github__merged-icon {
      flex: none;
    }
    .github__unlink-pr {
      flex: auto;
    }
    .github__unlink-pr,
    .github__show-all-checks {
      text-align: right;
      margin-left: 16px;
    }
    .github__checks-summary {
      margin-bottom: 0;
    }
    .github__check-list {
      margin: 0 0 0 15px;
    }
    .github__check-item {
      list-style-type: none;
    }
    .github__status-icon,
    .github__merged-icon {
      margin-right: 2px;
    }
    .github__reviews-summary--pending {
      color: #878787;
    }
    .github__status-icon--success,
    .github__merged-icon,
    .github__reviews-summary--success {
      color: #64b80b;
    }
    .github__status-icon--failure,
    .github__check-item--failure a,
    .github__reviews-summary--failure {
      color: #d50000;
    }
    input.github__pr-input {
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        background-color 0.15s ease-in-out;
      border-radius: 4px;
      border: 1px dotted #ddd;
      padding: 0 4px;
      box-shadow: none;
      font-size: 12px;
      width: 100%;
      min-height: 24px;
      box-sizing: border-box;
    }
    input.github__pr-input:hover {
      border-color: rgba(0, 115, 207, 0.2);
      background-color: rgba(0, 115, 207, 0.05);
    }
    input.github__pr-input:focus {
      border-color: #88bbe4 !important;
      border-style: solid;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 2px rgba(82, 168, 236, 0.5) !important;
      background-color: transparent;
      outline: none;
      text-decoration: none;
    }
  </style>`;
}

function groupBy(list, grouping) {
  return list.reduce((acc, item) => {
    const value = grouping(item);
    if (acc[value] === undefined) {
      acc[value] = [];
    }

    acc[value].push(item);
    return acc;
  }, {});
}

function isCompleted(check) {
  return !["failure", "pending"].includes(check.status);
}

function Link(props) {
  return html`<a
    ...${props}
    target="_blank"
    rel="noopener noreferrer nofollow"
  />`;
}

function StatusIcon({ status }) {
  const className = classnames(
    "github__status-icon",
    `github__status-icon--${status}`,
    "fa fa-fw",
    {
      "fa-check-circle": status === "success",
      "fa-times-circle": status === "failure",
      "fa-circle-o-notch": status === "pending",
      "fa-circle-o": status === "neutral",
    }
  );

  return html`<i className=${className} aria-hidden="true" />`;
}

function ChecksSummary({ checks }) {
  const checksByStatus = groupBy(checks, (check) => check.status);
  const summarizedStatus = checksByStatus.failure
    ? "failure"
    : !checksByStatus.pending
    ? "success"
    : "pending";

  const totalCount = checks.length;
  const completedCount = checks.filter(isCompleted).length;

  const className = classnames(
    "github__checks-summary",
    `github__checks-summary--${summarizedStatus}`
  );

  return html`<p className=${className}>
    <${StatusIcon} status=${summarizedStatus} />
    ${completedCount}/${totalCount} checks completed
  </p>`;
}

function Checks({ checks }) {
  const [showAll, setShowAll] = useState(false);

  const visibleChecks = showAll
    ? checks
    : checks.filter((check) => !isCompleted(check));
  const checkItems = visibleChecks.map((check) => {
    const { status, url, name } = check;
    const className = classnames("github__check-item", {
      "github__check-item--success": status === "success",
      "github__check-item--failure": status === "failure",
    });

    return html`<li className=${className}>
      <${StatusIcon} status=${status} />
      <${Link} href=${url}>${name}<//>
    </li>`;
  });

  const completedCount = checks.filter(isCompleted).length;
  const showMoreLink = showAll
    ? ""
    : html`<li className="github__check-item">
        <${StatusIcon} status="none" />
        <${Link} href="#" onClick=${(e) => {
        setShowAll(true);
        e.preventDefault();
      }}
          >See ${completedCount} more</${Link}
        >
      </li>`;

  return html`<${ChecksSummary} checks=${checks} />
    <ul class="github__check-list">
      ${checkItems} ${showMoreLink}
    </ul>`;
}

const reviewTextByState = {
  REQUEST_CHANGES: "Changes requested",
  APPROVED: "Approved",
  PENDING: "Waiting for review",
};

const reviewStatusByState = {
  REQUEST_CHANGES: "failure",
  APPROVED: "success",
  PENDING: "pending",
};

function Reviews({ reviews }) {
  const reviewsByState = groupBy(reviews, (review) => review.state);
  const summarizedState = reviewsByState.REQUEST_CHANGES
    ? "REQUEST_CHANGES"
    : reviewsByState.APPROVED
    ? "APPROVED"
    : "PENDING";

  const className = classnames(
    "github__reviews-summary",
    `github__reviews-summary--${reviewStatusByState[summarizedState]}`
  );

  return html`<p className=${className}>
    <${StatusIcon} status=${reviewStatusByState[summarizedState]} />
    ${reviewTextByState[summarizedState]}
  </p>`;
}

function MergedIcon({ merged }) {
  if (merged) {
    return html`<i
      className="fa fa-fw fa-code-fork github__merged-icon"
      aria-hidden="true"
      title="Merged"
    />`;
  } else {
    return "";
  }
}

function PullDetails({ pullDetails, clearPullRequest }) {
  return html`
    <div className="github">
      <p className="github__title">
        <${MergedIcon} merged=${pullDetails.merged} />
        <${Link} href=${pullDetails.url}>${pullDetails.title}<//>
        <${Link}
          href="#"
          onClick=${clearPullRequest}
          className="github__unlink-pr"
          ><i className="fa fa-fw fa-times"
        /><//>
      </p>
      <${Reviews} reviews="${pullDetails.reviews}" />
      <${Checks} checks="${pullDetails.checks}" />
    </div>
  `;
}

function component(container, props) {
  const { Aha, update, state } = props;
  if (state === null) {
    state = {};
  }

  function App() {
    const [pullRequest, setPullRequest] = useState(state.pullRequest);
    const [pullDetails, setPullDetails] = useState(null);

    const fetchPullDetails = async () => {
      const { owner, repo, pullNumber: pull_number } = pullRequest;
      const details = await Aha.call("fetch_pull_details", {
        owner,
        repo,
        pull_number,
      });
      console.log(details);

      setPullDetails(details);
    };

    const clearPullRequest = (event) => {
      setPullDetails(null);
      setPullRequest(null);
      update({});
      event.preventDefault();
    };

    const onURLUpdated = (event) => {
      const url = event.target.value;
      const regexp = new RegExp(
        /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/
      );
      const result = url.match(regexp);
      if (result.length === 4) {
        const [, owner, repo, pullNumber] = result;
        setPullRequest({
          owner,
          repo,
          pullNumber,
        });
        update({
          ...state,
          pullRequest: {
            owner,
            repo,
            pullNumber,
          },
        });
      }
    };

    if (pullDetails) {
      return html`<${PullDetails}
        pullDetails=${pullDetails}
        clearPullRequest=${clearPullRequest}
      />`;
    } else if (pullRequest) {
      fetchPullDetails();

      return html` <p>Loading details...</p> `;
    } else {
      return html` <input
        type="text"
        class="github__pr-input"
        placeholder="Paste your GitHub URL here"
        onChange=${(e) => onURLUpdated(e)}
      />`;
    }
  }

  render(html`<${Styles} /><${App} />`, container);

  return () => {
    render(null, container);
  };
}
