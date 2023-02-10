import { RichContent } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssRichContent: ComponentImplementation<RichContent<TemplateResult>> = {
  component: "richContent",
  implementation: "html-css",
  template: () =>
    function richContentTemplate({ children, slot }) {
      return html`<div class="dso-rich-content" slot=${slot}>${children}</div>`;
    },
};
