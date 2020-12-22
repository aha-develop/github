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

function App() {
  return html`<h1>Heading</h1>
    <p>Paragraph</p>`;
}

render(html`<${Styles} /><${App} />`, document.body);
