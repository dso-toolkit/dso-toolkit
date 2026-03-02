import { Badge } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreBadge: ComponentImplementation<Badge<TemplateResult>> = {
  component: "badge",
  implementation: "core",
  template: () =>
    function badgeTemplate({ status, message, label, toggletipPlacement, tooltipPlacement, children }) {
      return html`<dso-badge
        .status=${ifDefined(status)}
        .label=${ifDefined(label)}
        .toggletipPlacement=${ifDefined(toggletipPlacement)}
        .tooltipPlacement=${ifDefined(tooltipPlacement)}
      >
        ${message} ${children && html`<div slot="toggletip">${children}</div>`}
      </dso-badge>`;
    },
};
