import React from "react";

export function Menu({ record }) {
  async function sync() {
    await aha.command("aha-develop.github.sync", { record });
  }

  async function addLink() {
    await aha.command("aha-develop.github.addLink", { record });
  }

  async function removeLinks() {
    await aha.command("aha-develop.github.removeLinks", { record });
  }

  return (
    <aha-menu>
      <aha-button slot="button" type="attribute" size="mini">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-item onClick={addLink}>Paste PR link</aha-menu-item>
      <aha-menu-item onClick={sync}>Scan GitHub</aha-menu-item>
      <hr />
      <aha-menu-item>
        <a
          href="https://www.aha.io/support/develop/integrations/github/github-extension"
          target="_blank"
          rel="noopener noreferrer"
        >
          <aha-icon icon="fa fa-external-link" />
          Read the docs
        </a>
      </aha-menu-item>
      <aha-menu-item type="danger" onClick={removeLinks}>
        <a href>
          <aha-icon icon="fa fa-trash" />
          Unlink all PRs
        </a>
      </aha-menu-item>
    </aha-menu>
  );
}
