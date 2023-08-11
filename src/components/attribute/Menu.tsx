import React from "react";
import { LEARN_MORE_URL, webhookOnly } from "extension";
import { LinkableRecord } from "@lib/linkableRecord";

export const Menu: React.FC<{ record: LinkableRecord }> = ({ record }) => {
  const sync = async () => {
    await aha.command("aha-develop.github.sync", { record });
  };

  const addLink = async () => {
    await aha.command("aha-develop.github.addLink", { record });
  };

  const removeLinks = async () => {
    await aha.command("aha-develop.github.removeLinks", { record });
  };

  const isWebhookOnly = webhookOnly();
  const title = isWebhookOnly ? "Not available in webhook-only mode." : null;

  return (
    <aha-menu>
      <aha-button slot="control" kind="secondary" size="mini">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <aha-button
            disabled={isWebhookOnly || null}
            kind="plain"
            onClick={isWebhookOnly ? null : addLink}
            title={title}
          >
            Paste PR link
          </aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button
            disabled={isWebhookOnly || null}
            kind="plain"
            onClick={isWebhookOnly ? null : sync}
            title={title}
          >
            Scan GitHub
          </aha-button>
        </aha-menu-item>
        <hr />
        <aha-menu-item>
          <aha-button kind="plain" href={LEARN_MORE_URL} target="_blank">
            <aha-icon icon="fa fa-external-link" />
            Read the docs
          </aha-button>
        </aha-menu-item>
        <aha-menu-item type="danger">
          <aha-button kind="plain" onClick={removeLinks}>
            <aha-icon icon="fa fa-trash" />
            Unlink all PRs
          </aha-button>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
};
