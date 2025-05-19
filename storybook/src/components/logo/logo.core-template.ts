import { Logo } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreLogo: ComponentImplementation<Logo> = {
  component: "logo",
  implementation: "core",
  template: () =>
    function logoTemplate({ name, label, ribbon, labelUrl, logoUrl, dsoLogoClick, dsoLabelClick }) {
      return html`<dso-logo
        .name=${ifDefined(name)}
        .label=${ifDefined(label)}
        .labelUrl=${ifDefined(labelUrl)}
        .logoUrl=${ifDefined(logoUrl)}
        ribbon=${ifDefined(ribbon)}
        @dsoLogoClick=${ifDefined(dsoLogoClick)}
        @dsoLabelClick=${ifDefined(dsoLabelClick)}
      ></dso-logo>`;
    },
};
