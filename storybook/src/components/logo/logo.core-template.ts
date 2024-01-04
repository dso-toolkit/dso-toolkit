import { Logo } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const coreLogo: ComponentImplementation<Logo> = {
  component: "logo",
  implementation: "core",
  template: () =>
    function logoTemplate({ label, ribbon }) {
      return html`<dso-logo .label=${ifDefined(label)} ribbon=${ifDefined(ribbon)}></dso-logo>`;
    },
};
