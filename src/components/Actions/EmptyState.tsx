import { LinkableRecord } from "@lib/linkableRecord";
import { useClipboard } from "@lib/useClipboard";
import { ICON, IDENTIFIER, LEARN_MORE_URL } from "extension";
import React, { useEffect, useState } from "react";

const Menu: React.FC = () => {
  return (
    <aha-menu>
      <aha-button slot="control" size="mini">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <aha-button kind="plain" href={LEARN_MORE_URL} target="_blank">
            <aha-icon icon="fa fa-external-link" />
            Read the docs
          </aha-button>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
};

const EmptyStateBox: React.FC<{}> = ({ children }) => (
  <aha-box class="m-0" style={{ color: "var(--theme-secondary-text)" }}>
    <div style={{ margin: "calc(-2em + 12px)" }}>{children}</div>
  </aha-box>
);

export const EmptyState: React.FC<{ record: LinkableRecord }> = ({
  record,
}) => {
  const [onCopy, copied] = useClipboard();
  const [hasConfiguredWebhook, setHasConfiguredWebhook] =
    useState<Boolean | null>(null);

  // Song and dance to fetch installation status for webhook when component first loads
  useEffect(() => {
    (async () => {
      const hasConfiguredWebhook = await aha.account.getExtensionField(
        IDENTIFIER,
        "webhookConfigured"
      );
      setHasConfiguredWebhook(!!hasConfiguredWebhook); // coerce from null to false if the field isn't set
    })();
  }, []);

  if (hasConfiguredWebhook === null) {
    return <aha-spinner />;
  }

  if (!hasConfiguredWebhook) {
    return (
      <EmptyStateBox>
        <aha-flex justify-content="space-between" align-items="flex-start">
          <div className="mb-2" style={{ fontSize: 14, fontWeight: 500 }}>
            <aha-icon icon={ICON} class="mr-2" />
            Set up GitHub
          </div>
          <aha-button-group>
            <aha-button size="mini" href={LEARN_MORE_URL} target="_blank">
              Learn more
            </aha-button>
            <Menu />
          </aha-button-group>
        </aha-flex>
        <div style={{ fontSize: 12 }}>
          <a
            href={`/settings/account/extensions/${IDENTIFIER}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Install the webhook
          </a>
          &nbsp;to automatically link GitHub actions
        </div>
      </EmptyStateBox>
    );
  }

  return (
    <EmptyStateBox>
      <aha-flex justify-content="space-between" align-items="flex-start">
        <div className="mb-2" style={{ fontSize: 14, fontWeight: 500 }}>
          <aha-icon icon={ICON} class="mr-2" />
          No actions linked
        </div>
        <aha-button-group>
          <aha-button size="mini" onClick={(e) => onCopy(record.referenceNum)}>
            {copied ? "Copied!" : "Copy ID"}
          </aha-button>
          <Menu />
        </aha-button-group>
      </aha-flex>
      <div style={{ fontSize: 12 }}>
        Include <strong>{record.referenceNum}</strong> in your branch or commit
        message to link automatically
      </div>
    </EmptyStateBox>
  );
};
