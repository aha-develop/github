import { GithubActions } from "@lib/actions/githubActions";
import React, { useMemo, memo } from "react";
import IconText from "./IconText";

export type StatusIconProps = {
  status?: GithubActions.IWorkflowConclusion;
  style?: any;
};

const DEFAULT_STYLE = {
  fontSize: "12px",
  lineHeight: "14px",
  padding: "4px 8px",
  borderRadius: "4px",
  verticalAlign: "middle",
  textTransform: "capitalize",
};

const StatusIcon: React.FC<StatusIconProps> = ({ status, style = {} }) => {
  const statusIconStyle = useMemo(() => {
    let iconStyle = {};
    switch (status) {
      case "success":
        iconStyle = {
          color: "var(--theme-green-text)",
          backgroundColor: "var(--theme-green-background)",
        };
        break;
      case "failure":
      case "cancelled":
        iconStyle = {
          color: "var(--theme-red-text)",
          backgroundColor: "var(--theme-red-background)",
        };
        break;
      case "action_required":
      case "neutral":
      case "skipped":
      case "stale":
      case "timed_out":
        iconStyle = {
          color: "var(--theme-yellow-text)",
          backgroundColor: "var(--theme-yellow-background)",
        };
        break;
      default: {
        iconStyle = {
          color: "var(--theme-green-text)",
          backgroundColor: "var(--theme-green-background)",
        };
        break;
      }
    }
    return {
      ...DEFAULT_STYLE,
      ...style,
      ...iconStyle,
    };
  }, [style]);

  return (
    <IconText
      icon="fa-solid fa-check-circle"
      text={status}
      style={{ ...statusIconStyle }}
    />
  );
};

export default memo(StatusIcon);
