import { Footnote } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssFootnote: ComponentImplementation<Footnote> = {
  component: "footnote",
  implementation: "html-css",
  template: () =>
    function footnotesReferenceTemplate({ number }) {
      return html`
        <sup id="#voetnoot-${number}-link" class="dso-footnote-reference"
          ><a href="#voetnoot-${number}">[${number}]</a></sup
        >
      `;
    },
};
