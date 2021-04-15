import { useOutsideAlerter } from "@aha-app/aha-develop-react";
import { usePopper } from "https://cdn.skypack.dev/react-popper";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchPrStatus, prStatusCommit } from "../lib/github";
import { useGithubApi } from "../lib/useGithubApi";

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
      return "fa-regular fa-times-circle";
    case "PENDING":
      return "fa-regular fa-clock";
    case "SUCCESS":
      return "fa-regular fa-check-circle";
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

const StatusCheck = ({ context }) => {
  return (
    <aha-flex className="pr-check-detail" gap="5px">
      <span className="pr-check-icon">
        <StatusIcon status={context.state} />
      </span>
      {context.avatarUrl?.length > 0 && (
        <div className="pr-check-avatar">
          <img src={context.avatarUrl} />
        </div>
      )}
      <span>
        {context.targetUrl?.length > 0 ? (
          <a href={context.targetUrl} target="_blank">
            {context.context}
          </a>
        ) : (
          context.context
        )}
      </span>
    </aha-flex>
  );
};

/**
 *
 * @param {{prStatus: import("../lib/github").CommitStatus; showCount?: boolean}} param0
 * @returns
 */
function Status({ prStatus, showCount }) {
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
  const allowToggle = useRef(true);

  const toggleShowChecks = () => {
    if (allowToggle.current) setShowChecks((v) => !v);
  };
  useOutsideAlerter(popperElement, () => {
    if (showChecks) {
      allowToggle.current = false;
      setShowChecks(false);
      // Hiding the react popper seems super slow for some reason, and it causes
      // another re-render afterwards. When this was 100ms it still caused a
      // click on the toggle button to re-show the popup
      setTimeout(() => {
        allowToggle.current = true;
      }, 500);
    }
  });

  if (!prStatus.statusCheckRollup) {
    return null;
  }

  const contexts = prStatus?.status?.contexts || [];

  const checks = contexts.map((context, idx) => {
    return <StatusCheck key={idx} context={context} />;
  });

  const count = showCount !== false && (
    <span className="pr-count">
      {contexts.filter((v) => v.state === "SUCCESS").length}
      {"/"}
      {contexts.length} passed
    </span>
  );

  return (
    <span>
      <span
        className={`pr-status pr-status-${prStatus.statusCheckRollup.state.toLowerCase()}`}
        ref={setReferenceElement}
        onClick={toggleShowChecks}
      >
        <StatusIcon status={prStatus.statusCheckRollup.state} />
      </span>

      <span
        style={styles.popper}
        ref={popperElement}
        className={`pr-checks ${showChecks ? "" : "hidden"}`}
        {...attributes.popper}
      >
        <aha-flex direction="column" gap="4px">
          <aha-flex justifyContent="space-between" alignItems="baseline">
            <h5>Checks</h5>
            {count}
          </aha-flex>

          {checks}
        </aha-flex>
      </span>
    </span>
  );
}

/**
 * @param {{pr:import("../lib/fields").PrLink; showCount: boolean?}} param0
 */
function FetchStatus({ pr, showCount }) {
  const { data: prStatus, error, authed, loading, fetchData } = useGithubApi(
    async (api) => {
      if (pr.commits) return prStatusCommit(pr);
      return await fetchPrStatus(api, pr);
    }
  );

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

  return <Status prStatus={prStatus} showCount={showCount} />;
}

export { FetchStatus, Status };
