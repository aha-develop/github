import { IDENTIFIER, LEARN_MORE_URL, ICON } from "extension";
import React, { useEffect, useState } from "react";

import { useClipboard } from "@lib/useClipboard";

import { withGitHubApi } from "@lib/github/api";
import { getPrByUrl } from "@lib/github/getPr";
import { LinkableRecord } from "@lib/linkableRecord";
import { validPrUrl } from "@lib/validPrUrl";
import { updatePullRequestLinkOnRecord } from "@lib/linkPullRequest";
import { githubPullRequestToPrLink } from "@lib/github/converters";

type MenuProps = {
  record: LinkableRecord;
  onPaste: Function;
};

const Menu = ({ record, onPaste }: MenuProps) => {
  const handleSync = () => {
    aha.command(`${IDENTIFIER}.sync`, { record });
  };

  return (
    <aha-menu>
      <aha-button slot="control" size="mini">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => onPaste()}>
            Paste PR link
          </aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button kind="plain" onClick={handleSync}>
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
  const [pasteMode, setPasteMode] = useState<Boolean>(false);
  const [validation, setValidation] = useState<String | null>(null);
  const [hasConfiguredWebhook, setHasConfiguredWebhook] =
    useState<Boolean | null>(null);

  // aha-menu gets mad if you remove it from the DOM while the menu is open.
  // Wait 1 tick so the menu has a chance to unmount first.
  const viewPasteMode = () => {
    setTimeout(() => setPasteMode(true), 1);
  };

  const pasteLink = async (url: string) => {
    if (!validPrUrl(url)) {
      setValidation("Please enter a valid pull request URL");
      return;
    }

    await withGitHubApi(async (api) => {
      const pullRequest = await getPrByUrl(api, url);

      if (!pullRequest) {
        setValidation("Could not find pull request");
        setPasteMode(false);
        return;
      }

      const prLink = githubPullRequestToPrLink(pullRequest);
      await updatePullRequestLinkOnRecord(prLink, record);
      setPasteMode(false);
    });
  };

  // Song and dance to fetch installation status for webhook when component first loads
  useEffect(() => {
    (async () => {
      const hasConfiguredWebhook: boolean | null =
        await aha.account.getExtensionField(IDENTIFIER, "webhookConfigured");
      setHasConfiguredWebhook(!!hasConfiguredWebhook); // coerce from null to false if the field isn't set
    })();
  }, []);

  if (hasConfiguredWebhook === null) {
    return <aha-spinner />;
  }

  if (pasteMode) {
    return (
      <EmptyStateBox>
        <aha-flex justify-content="space-between" align-items="flex-start">
          <div className="mb-2" style={{ fontSize: 14, fontWeight: 500 }}>
            <aha-icon icon={ICON} class="mr-2" />
            Paste pull request link
          </div>
          <aha-button size="mini" onClick={() => setPasteMode(false)}>
            Cancel
          </aha-button>
        </aha-flex>
        <input
          type="text"
          placeholder="https://github.com/..."
          style={{
            display: "block",
            width: "calc(100% - 16px)",
            marginBottom: 0,
          }}
          onChange={(e) => pasteLink(e.target.value)}
          autoFocus
        />
        {validation}
      </EmptyStateBox>
    );
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
            <Menu record={record} onPaste={viewPasteMode} />
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
          &nbsp;to automatically link GitHub PRs
        </div>
      </EmptyStateBox>
    );
  }

  return (
    <EmptyStateBox>
      <aha-flex justify-content="space-between" align-items="flex-start">
        <div className="mb-2" style={{ fontSize: 14, fontWeight: 500 }}>
          <aha-icon icon={ICON} class="mr-2" />
          No pull request linked
        </div>
        <aha-button-group>
          <aha-button size="mini" onClick={(e) => onCopy(record.referenceNum)}>
            {copied ? "Copied!" : "Copy ID"}
          </aha-button>
          <Menu record={record} onPaste={viewPasteMode} />
        </aha-button-group>
      </aha-flex>
      <div style={{ fontSize: 12 }}>
        Include <strong>{record.referenceNum}</strong> in your branch or PR name
        to link automatically
      </div>
    </EmptyStateBox>
  );
};
