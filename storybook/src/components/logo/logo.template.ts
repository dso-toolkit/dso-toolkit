import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Logo } from "./logo.models.js";

export function logoTemplate({ name, label, ribbon, labelUrl, logoUrl, dsoLogoClick, dsoLabelClick }: Logo) {
  return html`<dso-logo
    .name=${ifDefined(name)}
    .label=${ifDefined(label)}
    .labelUrl=${ifDefined(labelUrl)}
    .logoUrl=${ifDefined(logoUrl)}
    ribbon=${ifDefined(ribbon)}
    @dsoLogoClick=${ifDefined(dsoLogoClick)}
    @dsoLabelClick=${ifDefined(dsoLabelClick)}
  ></dso-logo>`;
}
