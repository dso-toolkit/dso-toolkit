import { RowEqualHeights } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssRowEqualHeights: ComponentImplementation<RowEqualHeights<TemplateResult>> = {
  component: "rowEqualHeights",
  implementation: "html-css",
  template: () =>
    function rowEqualHeightsTemplate({ children }) {
      return html`<div class="row dso-equal-heights">${children}</div>`;
    },
};
