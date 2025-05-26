import { AdvancedSelect } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreAdvancedSelect: ComponentImplementation<AdvancedSelect<unknown>> = {
  component: "advancedSelect",
  implementation: "core",
  template: () =>
    function advancedSelectTemplate({ options, active, activeHint, dsoChange, dsoRedirect }) {
      return html` <dso-advanced-select
        .options=${options}
        .active=${ifDefined(active)}
        .activeHint=${ifDefined(activeHint)}
        @dsoChange=${dsoChange}
        @dsoRedirect=${dsoRedirect}
      ></dso-advanced-select>`;
    },
};
