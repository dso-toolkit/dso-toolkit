import { Legend } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreLegend: ComponentImplementation<Legend> = {
  component: "legend",
  implementation: "core",
  template: () =>
    function legendTemplate({}) {
      return html`<dso-legend></dso-legend>`;
    },
};
