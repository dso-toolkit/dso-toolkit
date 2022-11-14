import { Toggletip } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({ children, label, position, small, secondary }) {
      return html`<dso-toggletip
        label=${ifDefined(label)}
        position=${ifDefined(position)}
        ?small=${small}
        ?secondary=${secondary}
        >${children}</dso-toggletip
      >`;
    },
};
