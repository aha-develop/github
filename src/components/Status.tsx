import { usePopperAlerter } from "@lib/usePopperAlerter";
import {
  PrCommitStatusFragment,
  PrStatusContextFragment,
} from "generated/graphql";
import React from "react";
import { ExternalLink } from "./ExternalLink";

const statusIcon = (status: PrStatusContextFragment["state"]) => {
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

const StatusIcon: React.FC<{ status: PrStatusContextFragment["state"] }> = ({
  status,
}) => {
  return (
    <span className={`pr-check pr-check-${status.toLowerCase()}`}>
      <aha-icon icon={statusIcon(status)} />
    </span>
  );
};

const StatusCheck: React.FC<{ context: PrStatusContextFragment }> = ({
  context,
}) => {
  return (
    <aha-flex className="pr-check-detail" gap="5px">
      <span className="pr-check-icon">
        <StatusIcon status={context.state} />
      </span>
      {context.avatarUrl && context.avatarUrl.length > 0 && (
        <div className="pr-check-avatar">
          <img src={context.avatarUrl} />
        </div>
      )}
      <span>
        {context.targetUrl?.length > 0 ? (
          <ExternalLink href={context.targetUrl}>
            {context.context}
          </ExternalLink>
        ) : (
          context.context
        )}
      </span>
    </aha-flex>
  );
};

const Status: React.FC<{ prStatus: PrCommitStatusFragment }> = ({
  prStatus,
}) => {
  const {
    attributes,
    popperElement,
    setReferenceElement,
    styles,
    toggle,
    visible,
  } = usePopperAlerter({ modifiers: [] });

  if (!prStatus.statusCheckRollup) {
    return null;
  }

  const contexts = prStatus?.status?.contexts || [];

  const checks = contexts.map((context, idx) => {
    return <StatusCheck key={idx} context={context} />;
  });

  const count = (
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
        onClick={() => toggle()}
      >
        <StatusIcon status={prStatus.statusCheckRollup.state} />
      </span>

      <span
        style={styles.popper}
        ref={popperElement}
        className={`pr-checks ${visible ? "" : "hidden"}`}
        {...attributes.popper}
      >
        <aha-flex direction="column" gap="4px">
          <aha-flex justify-content="space-between" align-items="baseline">
            <h5>Checks</h5>
            {count}
          </aha-flex>

          {checks}
        </aha-flex>
      </span>
    </span>
  );
};

export { Status };
