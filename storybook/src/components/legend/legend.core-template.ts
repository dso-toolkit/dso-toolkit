import { Legend } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreLegend: ComponentImplementation<Legend<TemplateResult>> = {
  component: "legend",
  implementation: "core",
  template: () =>
    function legendTemplate({ navbarItems, dsoClose, dsoLegendNavbarItemClick, content }) {
      return html`<dso-legend
        .navbarItems=${navbarItems}
        @dsoLegendNavbarItemClick=${dsoLegendNavbarItemClick}
        @dsoClose=${dsoClose}
      >
        ${content}
      </dso-legend>`;
    },
};
