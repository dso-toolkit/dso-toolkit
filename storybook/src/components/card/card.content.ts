import { InfoButton } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { Templates } from "../../templates";

export const content = html`<p>Gemeente Nieuwegein informeert haar burgers graag over de Omgevingswet.</p>`;

export function infoButton({ richContentTemplate }: Templates): InfoButton<TemplateResult> {
  return {
    label: 'Toon informatie over het "Omgevingsplan Nieuwegein"',
    children: richContentTemplate({ children: html`<p>Extra informatie over het "Omgevingsplan Nieuwegein"</p>` }),
    toggletipPlacement: "left",
  };
}
