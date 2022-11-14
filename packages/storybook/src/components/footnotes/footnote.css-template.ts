import { Footnote } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssFootnote: ComponentImplementation<Footnote> = {
  component: "footnote",
  implementation: "css",
  template: ({ anchorTemplate }) =>
    function footnotesReferenceTemplate({ number }) {
      return html`
        <sup id="#voetnoot-${number}-link" class="dso-footnote-reference">
          ${anchorTemplate({ label: "[" + number + "]", url: "#voetnoot-" + number })}
        </sup>
      `;
    },
};
