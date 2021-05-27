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
      <aha-button slot="button" type="attribute" size="small">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-item onClick={() => sync(record)}>Resync</aha-menu-item>
      <aha-menu-item onClick={() => addLink(record)}>
        Link pull request
      </aha-menu-item>
      <aha-menu-item onClick={() => removeLinks(record)}>
        Unlink pull requests
      </aha-menu-item>
    </aha-menu>
  );
}
