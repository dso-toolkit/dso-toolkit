import { InfoButton } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { Templates } from "../../templates";

export const typeItems = [
  html`<span class="dso-document-card-type-item">Omgevingsplan</span>`,
  html`<span class="dso-document-card-type-item">Gemeente Amsterdam</span>`,
];

const labels = ["BouwWerken", "Kleine windturbine"];
export const labelsItems = labels.map(
  (label) => html` <span style="border: 1px solid #333; border-radius: 4px; padding: 0 8px;">${label}</span> `,
);

export function infoButton({ richContentTemplate }: Templates): InfoButton<TemplateResult> {
  return {
    label: "Toon informatie over het documenttype",
    children: richContentTemplate({ children: html`<p>Extra informatie over het documenttype</p>` }),
    toggletipPlacement: "right",
  };
}
