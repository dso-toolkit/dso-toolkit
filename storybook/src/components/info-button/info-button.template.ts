import { TemplateResult, html } from "lit-html";

import { InfoButton } from "./info-button.models.js";

export function infoButtonTemplate({
  label,
  active,
  toggletipPlacement,
  dsoToggle,
  children,
}: InfoButton<TemplateResult>) {
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
}
