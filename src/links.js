import { h, render } from "https://cdn.pika.dev/preact@^10.4.4";
import { useState } from "https://cdn.pika.dev/preact@^10.4.4/hooks";
import htm from "https://cdn.pika.dev/htm@^3.0.4";
import classnames from "https://cdn.pika.dev/classnames@^2.2.6";

const html = htm.bind(h);

export function links(root, props, state) {
  const { Aha, update } = props;
  if (state === null) {
    state = {};
  }

  function App() {
    return html` <p>Loading details...</p> `;
  }

  render(html`<${App} />`, root);

  return () => {
    render(null, root);
  };
}
