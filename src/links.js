import { h } from "https://cdn.pika.dev/preact@^10.4.4";
import render from "https://cdn.pika.dev/preact-render-to-string";
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

export function links(props) {
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

  function menu() {
    return html`<div
      class="popdown attribute-popdown"
      data-reactive-preserve-attributes="true"
    >
      <a class="popdown__trigger btn btn-mini btn-link"
        ><i class="fa fa-ellipsis-h"></i
      ></a>
      <div
        class="popdown__menu popdown__menu--has-inner"
        x-placement="bottom-end"
      >
        <div class="popdown__inner">
          <ul>
            <li>
              <a
                rel="nofollow"
                data-method="post"
                data-remote="true"
                href="${Aha.commandUrl("createBranch", { record })}"
                >Create branch</a
              >
            </li>
            <li>
              <a rel="nofollow" data-remote="true" href="${Aha.viewUrl("auth")}"
                >Login</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>`;
  }

  function App() {
    if (fields.branches || fields.pullRequests) {
      return html`${branches()}${pullRequests()}${menu()}`;
    } else {
      return html`<div>Not linked</div>
        ${menu()}`;
    }
  }

  return render(html`<${Styles} /><${App} />`);
}

Aha.on("links", function (args) {
  return links(args);
});
