import { InfoButton } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { Templates } from "../../templates";

export const typeItems = [
  html`<span class="dso-document-card-type-item">Omgevingsplan</span>`,
  html`<span class="dso-document-card-type-item">Gemeente Amsterdam</span>`,
];

export function infoButton({ richContentTemplate }: Templates): InfoButton<TemplateResult> {
  return {
    label: "Toon informatie over het documenttype",
    children: richContentTemplate({ children: html`<p>Extra informatie over het documenttype</p>` }),
    toggletipPlacement: "right",
  };
}
