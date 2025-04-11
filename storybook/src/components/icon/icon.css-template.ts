import { Icon } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssIcon: ComponentImplementation<Icon> = {
  component: "icon",
  implementation: "html-css",
  template: () =>
    function iconTemplate({ icon, slot }) {
      return html`<svg class="di di-${icon}" slot=${ifDefined(slot)}>
        <use href="#${icon}" />
      </svg>`;
    },
};
