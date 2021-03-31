import React, { useState } from "react";
import { unlinkPullRequest } from "../lib/fields";
import { fetchPrStatus } from "../lib/github";
import { useGithubApi } from "../lib/useGithubApi";
import { usePopper } from "https://cdn.skypack.dev/react-popper";
import { InlineIcon, Icon } from "https://cdn.skypack.dev/@iconify/react";
import checkCircle16 from "https://cdn.skypack.dev/@iconify/icons-octicon/check-circle-16";
import xCircle16 from "https://cdn.skypack.dev/@iconify-icons/octicon/x-circle-16";
import alert16 from "https://cdn.skypack.dev/@iconify-icons/octicon/alert-16";
import clock16 from "https://cdn.skypack.dev/@iconify-icons/octicon/clock-16";

/**
 * @param {import("../lib/github").StatusState} status
 */
const statusIcon = (status) => {
  switch (status) {
    case "ERROR":
      return alert16;
    case "EXPECTED":
      return clock16;
    case "FAILURE":
      return xCircle16;
    case "PENDING":
      return clock16;
    case "SUCCESS":
      return checkCircle16;
  }
};

/**
 * @param {{status: import("../lib/github").StatusState}} param0
 */
const StatusIcon = ({ status }) => {
  const icon = statusIcon(status);
  return (
    <span className={`pr-icon pr-icon-${status.toLowerCase()}`}>
      <InlineIcon icon={icon} />
    </span>
  );
};

function Status({ record, pr }) {
  const { data: prStatus, error, authed, loading, fetch } = useGithubApi(
    async (api) => await fetchPrStatus(api, pr)
  );
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [],
  });
  const [showChecks, setShowChecks] = useState(false);

  const toggleShowChecks = (event) => {
    event.preventDefault();
    setShowChecks((v) => !v);
  };

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
        <aha-icon icon="fa-regular fa-spinner fa-spin"></aha-icon>
      </span>
    );
  }

  if (!authed || !prStatus) {
    return (
      <span className="pr-status">
        <button className="refresh" onClick={fetch}>
          <aha-icon icon="fa-regular fa-refresh"></aha-icon>
        </button>
      </span>
    );
  }

  if (!prStatus.statusCheckRollup) {
    return null;
  }

  const contexts = prStatus?.status?.contexts || [];

  const checks = contexts.map((context, idx) => {
    return (
      <div
        key={idx}
        className={`pr-check pr-check-${context.state.toLowerCase()}`}
      >
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
      <div
        className={`pr-status pr-status-${prStatus.statusCheckRollup.state.toLowerCase()}`}
        ref={setReferenceElement}
        onClick={toggleShowChecks}
      >
        <StatusIcon status={prStatus.statusCheckRollup.state} />
        {count}
      </div>
      <div
        style={styles.popper}
        ref={setPopperElement}
        className={`pr-checks ${showChecks ? "" : "hidden"}`}
        {...attributes.popper}
      >
        {checks}
      </div>
    </>
  );
}

function PullRequest({ record, pr }) {
  const handleUnlink = (number) => async () => {
    console.log("unlink", number);
    unlinkPullRequest(record, number);
  };

  return (
    <aha-flex>
      <a href={pr.url} target="_blank">
        {pr.name}
      </a>
      <span className={`pr-state pr-state-${pr.state.toLowerCase()}`}>
        {pr.state}
      </span>
      <button onClick={handleUnlink(pr.id)} className="icon-button">
        <aha-icon icon="fa-regular fa-trash fa-fw"></aha-icon>
      </button>

      <Status record={record} pr={pr} />
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
