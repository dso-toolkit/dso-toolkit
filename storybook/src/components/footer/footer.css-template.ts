import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { Footer } from "dso-toolkit";

export const cssFooter: ComponentImplementation<Footer<TemplateResult>> = {
  component: "footer",
  implementation: "html-css",
  template: () =>
    function footerTemplate({ children }) {
      return html`<footer>${children}</footer>`;
    },
};
