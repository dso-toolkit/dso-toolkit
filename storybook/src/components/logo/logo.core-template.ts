import { Logo } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const coreLogo: ComponentImplementation<Logo> = {
  component: "logo",
  implementation: "core",
  template: () =>
    function logoTemplate({ label, ribbon, labelUrl, logoUrl, dsoLogoClick, dsoLabelClick, lang }) {
      return html`<dso-logo
        .label=${ifDefined(label)}
        .labelUrl=${ifDefined(labelUrl)}
        .logoUrl=${ifDefined(logoUrl)}
        ribbon=${ifDefined(ribbon)}
        @dsoLogoClick=${ifDefined(dsoLogoClick)}
        @dsoLabelClick=${ifDefined(dsoLabelClick)}
        lang=${ifDefined(lang)}
      ></dso-logo>`;
    },
};
