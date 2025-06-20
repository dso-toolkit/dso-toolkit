import { ResponsiveElement } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreResponsiveElement: ComponentImplementation<ResponsiveElement<TemplateResult>> = {
  component: "responsiveElement",
  implementation: "core",
  template: () =>
    function responsiveElementTemplate({ dsoSizeChange, children }) {
      return html`<dso-responsive-element @dsoSizeChange=${dsoSizeChange}>${children}</dso-responsive-element>`;
    },
};
