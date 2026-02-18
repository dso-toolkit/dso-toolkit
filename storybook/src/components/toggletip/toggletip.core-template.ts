import { Toggletip } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({ children, label, position, small }) {
      return html`<dso-toggletip label=${ifDefined(label)} position=${ifDefined(position)} ?small=${small}
        >${children}</dso-toggletip
      >`;
    },
};
