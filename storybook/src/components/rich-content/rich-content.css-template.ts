import { RichContent } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssRichContent: ComponentImplementation<RichContent<TemplateResult>> = {
  component: "richContent",
  implementation: "html-css",
  template: () =>
    function richContentTemplate({ children, slot }) {
      return html`<div class="dso-rich-content" slot=${ifDefined(slot)}>${children}</div>`;
    },
};
