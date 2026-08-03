import { TemplateResult, html } from "lit-html";

import { InfoButton } from "../info-button/info-button.models.js";
import { Label } from "../label/label.models.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

export const typeItems = [
  html`<span class="dso-document-card-type-item">Omgevingsplan</span>`,
  html`<span class="dso-document-card-type-item">Gemeente Amsterdam</span>`,
];

export const labels: Label[] = [
  {
    label: "Bouwwerken",
    compact: true,
    status: "bright",
  },
  {
    label: "Kleine windturbine",
    compact: true,
    status: "bright",
  },
];

export function infoButton(): InfoButton<TemplateResult> {
  return {
    label: "Toon informatie over het documenttype",
    children: richContentTemplate({ children: html`<p>Extra informatie over het documenttype</p>` }),
    toggletipPlacement: "right",
  };
}
