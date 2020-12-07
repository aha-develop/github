import { h, render } from "https://cdn.pika.dev/preact@^10.4.4";
import { useState } from "https://cdn.pika.dev/preact@^10.4.4/hooks";
import htm from "https://cdn.pika.dev/htm@^3.0.4";
import classnames from "https://cdn.pika.dev/classnames@^2.2.6";

const html = htm.bind(h);

function Styles() {
  return html` <style>
    .type-icon {
      font-size: 18px;
      color: #aaa;
      padding-right: 5px;
      vertical-align: middle;
    }
  </style>`;
}

export function links(container, props) {
  const { Aha, update, state, fields } = props;

  console.log(fields);

  function pullRequests() {
    if (!fields.pullRequests || fields.pullRequests.length == 0) return html``;

    return html`<div>
      ${fields.pullRequests.map(
        (pr) =>
          html`<div>
            <a href="${pr.url}" target="_blank">${pr.name}</a>
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

  function App() {
    if (fields.branches || fields.pullRequests) {
      return html`${branches()}${pullRequests()}`;
    } else {
      return html`<p>Not linked</p>`;
    }
  }

  render(html`<${Styles} /><${App} />`, container);

  return () => {
    render(null, container);
  };
}
