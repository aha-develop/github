import { h, render, Fragment } from "https://cdn.pika.dev/preact@^10.4.4";
import htm from "https://cdn.pika.dev/htm@^3.0.4";
import { unlinkPullRequest } from "./lib/fields";

const html = htm.bind(h);

/**
 * @param {Aha.RecordStub} record
 */
function createBranch(record) {
  aha.command("aha-develop.github.createBranch", {
    name: `${record.referenceNum}-branch`,
  });
}

async function sync(record) {
  const result = await aha.command("aha-develop.github.sync", record);
  console.log("fin sync", result);
}

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

function PullRequests({ record, fields }) {
  if (!fields.pullRequests || fields.pullRequests.length == 0) return html``;

  const handleUnlink = (number) => async () => {
    console.log("unlink", number);
    unlinkPullRequest(record, number);
  };

  const pullRequests = (fields.pullRequests || []).map((pr, idx) => (
    <div key={idx}>
      <a href={pr.url} target="_blank">
        {pr.name}
      </a>
      <span class={`pr-state pr-state-${pr.state.toLowerCase()}`}>
        {pr.state}
      </span>
      <button onClick={handleUnlink(pr.id)}>unlink</button>
    </div>
  ));

  return <div>{pullRequests}</div>;
}

function Branches({ fields }) {
  const branches = (fields.branches || []).map((branch, idx) => (
    <div key={idx}>
      <i class="fa fa-code-fork type-icon" />
      <a href={branch.url} target="_blank">
        {branch.name}
      </a>
    </div>
  ));

  return <div>{branches}</div>;
}

function Menu({ record }) {
  return (
    <aha-action-menu buttonSize="medium">
      <aha-menu>
        <aha-menu-item onClick={() => createBranch(record)}>
          Create Branch
        </aha-menu-item>
        <aha-menu-item onClick={() => sync(record)}>Resync</aha-menu-item>
      </aha-menu>
    </aha-action-menu>
  );
}

function App({ fields, record }) {
  const githubLinks =
    fields.branches || fields.pullRequests ? (
      <>
        <Branches fields={fields} />
        <PullRequests record={record} fields={fields}></PullRequests>
      </>
    ) : (
      <div>Not linked</div>
    );

  return (
    <aha-flex alignItems="center">
      {githubLinks}
      <div style="margin-left: auto"></div>
      <Menu record={record} />
    </aha-flex>
  );
}

/**
 * @type {Aha.RenderExtension}
 */
function links(container, { record, fields }) {
  render(
    <>
      <Styles /> <App fields={fields} record={record} />
    </>,
    container
  );
}

aha.on("links", links);
