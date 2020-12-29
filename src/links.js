import { h, render } from "https://cdn.pika.dev/preact@^10.4.4";
import htm from "https://cdn.pika.dev/htm@^3.0.4";

const html = htm.bind(h);

function Styles() {
  return html` <style>
    .type-icon {
      font-size: 18px;
      color: #aaa;
      padding-right: 5px;
      vertical-align: middle;
    }

    .pr-state {
      display: inline-block;
      font-size: 12px;
      background-color: #aaa;
      color: white;
      padding: 1px 6px;
      border-radius: 4px;
      margin-left: 5px;
    }
  </style>`;
}

function links(container, props) {
  const { record, update, state, fields } = props;
  console.log("PROPS:");
  console.log(props);
  console.log("FIELDS:");
  console.log(fields);

  function pullRequests() {
    if (!fields.pullRequests || fields.pullRequests.length == 0) return html``;

    return html`<div>
      ${fields.pullRequests.map(
        (pr) =>
          html`<div>
            <a href="${pr.url}" target="_blank">${pr.name}</a>
            <span class="pr-state">${pr.state}</span>
          </div>`
      )}
    </div>`;
  }

  function branches() {
    if (!fields.branches || fields.branches.length == 0) return html``;

    return html`<div>
      ${fields.branches.map(
        (branch) =>
          html`<div>
            <i class="fa fa-code-fork type-icon" />
            <a href="${branch.url}" target="_blank">${branch.name}</a>
          </div>`
      )}
    </div>`;
  }

  function createBranch() {
    aha.command("aha-develop.github.createBranch", {
      name: `${record.referenceNum}-branch`,
    });
  }

  function sync() {
    aha.command("aha-develop.github.sync", {
      referenceNum: record.referenceNum,
    });
  }

  function buttons() {
    return html`<div>
      <button class="btn btn-mini" onClick="${(e) => createBranch()}">
        Create branch
      </button>
      ${" "}
      <button class="btn btn-mini" onClick="${(e) => sync()}">Resync</button>
    </div>`;
  }

  function menu() {
    return ""; //html`<div><i>Menu goes here</i></div>`;
  }

  function App() {
    if (fields.branches || fields.pullRequests) {
      return html`${branches()}${pullRequests()}${menu()}${buttons()}`;
    } else {
      return html`<div>Not linked</div>
        ${menu()}${buttons()}`;
    }
  }

  render(html`<${Styles} /><${App} />`, container);
}

aha.on("links", function (container, args) {
  return links(container, args);
});
