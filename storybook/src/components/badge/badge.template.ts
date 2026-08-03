import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Badge } from "./badge.models.js";

export function badgeTemplate({ status, message, label, toggletipPlacement, children }: Badge<TemplateResult>) {
  return html`<dso-badge
    .status=${ifDefined(status)}
    .label=${ifDefined(label)}
    .toggletipPlacement=${ifDefined(toggletipPlacement)}
  >
    ${message} ${children ? html`<div slot="toggletip">${children}</div>` : nothing}
  </dso-badge>`;
}
