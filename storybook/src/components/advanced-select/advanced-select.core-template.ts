import { AdvancedSelect } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const coreAdvancedSelect: ComponentImplementation<AdvancedSelect> = {
  component: "advancedSelect",
  implementation: "core",
  template: () =>
    function advancedSelectTemplate({ options, active, open }) {
      return html`<dso-advanced-select .options=${options} .active=${ifDefined(active)} .open=${open === true}></dso-advanced-select>`;
    },
};
