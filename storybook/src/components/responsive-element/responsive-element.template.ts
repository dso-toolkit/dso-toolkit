import { TemplateResult, html } from "lit-html";

import { ResponsiveElement } from "./responsive-element.models.js";

export function responsiveElementTemplate({ dsoSizeChange, children }: ResponsiveElement<TemplateResult>) {
  return html`<dso-responsive-element @dsoSizeChange=${dsoSizeChange}>${children}</dso-responsive-element>`;
}
