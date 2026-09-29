import { Truncate } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreTruncate: ComponentImplementation<Truncate<TemplateResult>> = {
  component: "truncate",
  implementation: "core",
  template: () =>
    function truncateTemplate({ children }) {
      return html`<dso-truncate>${children}</dso-truncate>`;
    },
};
