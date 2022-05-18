import React from "react";

async function sync(record) {
  await aha.command("aha-develop.github.sync", { record });
}

async function addLink(record) {
  await aha.command("aha-develop.github.addLink", { record });
}

async function removeLinks(record) {
  await aha.command("aha-develop.github.removeLinks", { record });
}

export function Menu({ record }) {
  return (
    <aha-menu>
      <aha-button slot="control" kind="attribute" size="small">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <a href="#" onClick={() => sync(record)}>Resync</a>
        </aha-menu-item>
        <aha-menu-item>
          <a href="#" onClick={() => addLink(record)}>
            Link pull request
          </a>
        </aha-menu-item>
        <aha-menu-item>
          <a href="#" onClick={() => removeLinks(record)}>
            Unlink pull requests
          </a>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
}
