import { Footer } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssFooter: ComponentImplementation<Footer<TemplateResult>> = {
  component: "footer",
  implementation: "html-css",
  template: () =>
    function footerTemplate({ children }) {
      return html`<footer>${children}</footer>`;
    },
};
