import { Legend } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreLegend: ComponentImplementation<Legend<TemplateResult>> = {
  component: "legend",
  implementation: "core",
  template: () =>
    function legendTemplate({ navbarItems }) {
      return html`<dso-legend
        .navbarItems=${navbarItems}
        @dsoPanelSwitch=${(e) => console.info(e)}
        @dsoClose=${(e) => console.info(e)}
      ></dso-legend>`;
    },
};
