import { InfoButton } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreInfoButton: ComponentImplementation<InfoButton<TemplateResult>> = {
  component: "infoButton",
  implementation: "core",
  template: () =>
    function infoButtonTemplate({ label, active, toggletipPlacement, dsoToggle, children }) {
      return html`
        <dso-info-button
          label=${label}
          ?active=${active}
          .toggletipPlacement=${toggletipPlacement}
          @dsoToggle=${(e: CustomEvent) => dsoToggle?.(e.detail)}
        >
          ${children && html`<div slot="toggletip">${children}</div>`}
        </dso-info-button>
      `;
    },
};
