import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { InfoButton } from "./info-button.models.js";

export function infoButtonTemplate({ label, active, toggletipPlacement, dsoToggle, children }: InfoButton) {
  return html`
    <dso-info-button
      label=${label}
      ?active=${active}
      toggletip-placement=${ifDefined(toggletipPlacement)}
      @dsoToggle=${(e: CustomEvent) => dsoToggle?.(e.detail)}
    >
      ${children && html`<div slot="toggletip">${children}</div>`}
    </dso-info-button>
  `;
}
