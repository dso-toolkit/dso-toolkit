import { Paragraph } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssParagraph: ComponentImplementation<Paragraph> = {
  component: "paragraph",
  implementation: "html-css",
  template: () =>
    function paragraphTemplate({ variant, content }) {
      return html`<p class=${ifDefined(variant ? "dso-disclaimer" : undefined)}>${content}</p>`;
    },
};
