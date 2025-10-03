import { Toggletip } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({ children, variant, label, placement, badgeStatus, badgeMessage }) {
      return html`<dso-toggletip
        variant=${ifDefined(variant)}
        label=${ifDefined(label)}
        placement=${ifDefined(placement)}
        .badgeStatus=${ifDefined(badgeStatus)}
        .badgeMessage=${ifDefined(badgeMessage)}
        >${children}</dso-toggletip
      >`;
    },
};
