import { html } from "lit-html";

import { Footnote } from "./footnotes.models.js";

export function footnoteTemplate({ number }: Footnote) {
  return html`
    <sup id="#voetnoot-${number}-link" class="dso-footnote-reference"
      ><a href="#voetnoot-${number}">[${number}]</a></sup
    >
  `;
}
