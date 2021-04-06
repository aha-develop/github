import React, { useRef, useState } from "react";
import { unlinkPullRequest } from "../lib/fields";
import { fetchPrStatus } from "../lib/github";
import { useGithubApi } from "../lib/useGithubApi";
import { usePopper } from "https://cdn.skypack.dev/react-popper";
import { useOutsideAlerter } from "@aha-app/aha-develop-react";

/**
 * @param {import("../lib/github").StatusState} status
 */
const statusIcon = (status) => {
  switch (status) {
    case "ERROR":
      return "fa-regular fa-exclamation-triangle";
    case "EXPECTED":
      return "fa-regular fa-clock";
    case "FAILURE":
      return "fa-regular fa-times";
    case "PENDING":
      return "fa-regular fa-clock";
    case "SUCCESS":
      return "fa-regular fa-check";
  }
};

/**
 * @param {{status: import("../lib/github").StatusState}} param0
 */
const StatusIcon = ({ status }) => {
  return (
    <span className={`pr-check pr-check-${status.toLowerCase()}`}>
      <aha-icon icon={statusIcon(status)} />
    </span>
  );
};

function Status({ record, pr }) {
  const { data: prStatus, error, authed, loading, fetchData } = useGithubApi(
    async (api) => await fetchPrStatus(api, pr)
  );
  const [referenceElement, setReferenceElement] = useState(null);
  const popperElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement.current,
    {
      modifiers: [],
    }
  );
  const [showChecks, setShowChecks] = useState(false);

  const toggleShowChecks = (/** @type {MouseEvent} */ event) => {
    setShowChecks((v) => !v);
  };
  useOutsideAlerter(popperElement, () => {
    if (showChecks) {
      setShowChecks(false);
    }
  });

  if (error) {
    return (
      <span className="pr-status">
        <aha-icon icon="fa-regular fa-warn"></aha-icon>
      </span>
    );
  }

  if (loading) {
    return (
      <span className="pr-status">
        <aha-spinner />
      </span>
    );
  }

  if (!authed || !prStatus) {
    return (
      <span className="pr-status">
        <aha-button onClick={fetchData}>
          <aha-icon icon="fa-regular fa-refresh"></aha-icon>
        </aha-button>
      </span>
    );
  }

  if (!prStatus.statusCheckRollup) {
    return null;
  }

  const contexts = prStatus?.status?.contexts || [];

  const checks = contexts.map((context, idx) => {
    return (
      <div key={idx}>
        <StatusIcon status={context.state} />
        <span>
          {context.targetUrl?.length > 0 ? (
            <a href={context.targetUrl} target="_blank">
              {context.context}
            </a>
          ) : (
            context.context
          )}
        </span>
      </div>
    );
  });

  const count = (
    <span className="pr-count">
      <span>{contexts.filter((v) => v.state === "SUCCESS").length}</span>
      <span>{"/"}</span>
      <span>{contexts.length}</span>
    </span>
  );

  return (
    <>
      <span
        className={`pr-status pr-status-${prStatus.statusCheckRollup.state.toLowerCase()}`}
        ref={setReferenceElement}
        onClick={toggleShowChecks}
      >
        <StatusIcon status={prStatus.statusCheckRollup.state} />
        {count}
      </span>
      <aha-tooltip type="popover">
        <span slot="trigger">Foo</span>
        {checks}
      </aha-tooltip>

      <span
        style={styles.popper}
        ref={popperElement}
        className={`pr-checks ${showChecks ? "" : "hidden"}`}
        {...attributes.popper}
      >
        {checks}
      </span>
    </>
  );
}

function PullRequest({ record, pr }) {
  const handleUnlink = (number) => async () => {
    console.log("unlink", number);
    unlinkPullRequest(record, number);
  };

  return (
    <aha-flex alignitems="center">
      <span>
        <a href={pr.url} target="_blank">
          {pr.name}
        </a>
        <Status record={record} pr={pr} />
      </span>
      <span className={`pr-state pr-state-${pr.state.toLowerCase()}`}>
        {pr.state}
      </span>
      <aha-button onClick={handleUnlink(pr.id)}>
        <aha-icon icon="fa-regular fa-trash" />
      </aha-button>
    </aha-flex>
  );
}

function PullRequests({ record, fields }) {
  const pullRequests = (fields.pullRequests || []).map((pr, idx) => (
    <PullRequest key={idx} record={record} pr={pr} />
  ));

  return <div>{pullRequests}</div>;
}

export default PullRequests;
