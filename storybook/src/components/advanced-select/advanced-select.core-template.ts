import { AdvancedSelect } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const coreAdvancedSelect: ComponentImplementation<AdvancedSelect<unknown>> = {
  component: "advancedSelect",
  implementation: "core",
  template: () =>
    function advancedSelectTemplate({ options, active, activeHint, open, dsoClick, dsoOptionClick, dsoRedirectClick }) {
      return html`<dso-advanced-select
        .options=${options}
        .active=${ifDefined(active)}
        .activeHint=${ifDefined(activeHint)}
        .open=${open}
        @dsoClick=${dsoClick}
        @dsoOptionClick=${dsoOptionClick}
        @dsoRedirectClick=${dsoRedirectClick}
      ></dso-advanced-select>`;
    },
};
