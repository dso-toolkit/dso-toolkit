import { LegendGroup } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../../templates";

export const coreLegendGroup: ComponentImplementation<LegendGroup<TemplateResult>> = {
  component: "legendGroup",
  implementation: "core",
  template: () =>
    function legendGroupTemplate({ mode, heading, children }) {
      return html` <dso-legend-group mode=${ifDefined(mode)}>
        ${heading ? html`${heading}` : nothing} ${children ? children : nothing}
      </dso-legend-group>`;
    },
};
