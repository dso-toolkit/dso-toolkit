import { Legend } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreLegend: ComponentImplementation<Legend<TemplateResult>> = {
  component: "legend",
  implementation: "core",
  template: () =>
    function legendTemplate({ tabItems, dsoClose, dsoContentSwitch, content }) {
      return html`<dso-legend .tabItems=${tabItems} @dsoContentSwitch=${dsoContentSwitch} @dsoClose=${dsoClose}>
        ${content}
      </dso-legend>`;
    },
};
