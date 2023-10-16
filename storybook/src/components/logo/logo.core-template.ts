import { Logo } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const coreLogo: ComponentImplementation<Logo> = {
  component: "logo",
  implementation: "core",
  template: () =>
    function logoTemplate({ label, ribbon }) {
      return html`<dso-logo label="${label}" ribbon="${ribbon}"></dso-logo> `;
    },
};
