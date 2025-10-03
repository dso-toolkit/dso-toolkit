import { Toggletip } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({ children, variant, label, placement, status, message }) {
      return html`<dso-toggletip
        .variant=${ifDefined(variant)}
        .label=${ifDefined(label)}
        .placement=${ifDefined(placement)}
        .status=${ifDefined(status)}
        .message=${ifDefined(message)}
        >${children}</dso-toggletip
      >`;
    },
};
