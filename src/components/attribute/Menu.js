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
          <aha-button kind="plain" onClick={() => sync(record)}>Resync</aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => addLink(record)}>
            Link pull request
          </aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => removeLinks(record)}>
            Unlink pull requests
          </aha-button>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
}
