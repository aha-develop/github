import { h, render } from "https://cdn.pika.dev/preact@^10.4.4";
import htm from "https://cdn.pika.dev/htm@^3.0.4";
import { unlinkPullRequest } from "./lib/fields";

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
      text-transform: capitalize;
    }
    .pr-state-open {
      background-color: #28a745;
    }
    .pr-state-merged {
      background-color: #6f42c1;
    }
    .pr-state-closed {
      background-color: #d73a49;
    }
    .pr-state-draft {
      background-color: #6a737d;
    }
  </style>`;
}

function prStatus(pr) {
  /*
  {
    viewer {
      login
      pullRequests(last: 10) {
        nodes {
          state
          commits(last: 1) {
            edges {
              node {
                id
                commit {
                  status {
                    state
                    contexts {
                      state
                      description
                      context
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  */
}

function links(container, props) {
  const { record, update, state, fields } = props;

  function PullRequests() {
    if (!fields.pullRequests || fields.pullRequests.length == 0) return html``;

    const handleUnlink = (number) => async () => {
      console.log('unlink', number);
      unlinkPullRequest(record, number);
    };

    return html`<div>
      ${fields.pullRequests.map(
        (pr) =>
          html`<div>
            <a href="${pr.url}" target="_blank">${pr.name}</a>
            <span class="pr-state pr-state-${pr.state.toLowerCase()}"
              >${pr.state}</span
            >
            <button onClick="${handleUnlink(pr.id)}">unlink</button>
          </div>`
      )}
    </div>`;
  }

  function Branches() {
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

  async function sync() {
    const result = await aha.command("aha-develop.github.sync", record);
    console.log("fin sync", result);
  }

  function Buttons() {
    return html`<div style="padding-top: 10px;">
      <aha-action-menu>
        <aha-menu>
          <aha-menu-item @click="${(e) => createBranch()}"
            >Create branch</aha-menu-item
          >
          <aha-menu-item @click="${(e) => sync()}">Resync</aha-menu-item>
        </aha-menu>
      </aha-action-menu>

      <button class="btn btn-mini" onClick="${(e) => createBranch()}">
        Create branch
      </button>
      ${" "}
      <button class="btn btn-mini" onClick="${(e) => sync()}">Resync</button>
    </div>`;
  }

  function Menu() {
    return ""; //html`<div><i>Menu goes here</i></div>`;
  }

  function App() {
    if (fields.branches || fields.pullRequests) {
      return html`${Branches()}${PullRequests()}${Menu()}${Buttons()}`;
    } else {
      return html`<div>Not linked</div>
        ${Menu()}${Buttons()}`;
    }
  }

  render(html`<${Styles} /><${App} />`, container);
}

aha.on("links", function (container, args) {
  return links(container, args);
});
