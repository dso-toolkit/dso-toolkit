import { TemplateResult, html } from "lit-html";

import { Legend } from "./legend.models.js";

export function legendTemplate({ tabItems, dsoClose, dsoContentSwitch, content }: Legend<TemplateResult>) {
  return html`<dso-legend .tabItems=${tabItems} @dsoContentSwitch=${dsoContentSwitch} @dsoClose=${dsoClose}>
    ${content}
  </dso-legend>`;
}
