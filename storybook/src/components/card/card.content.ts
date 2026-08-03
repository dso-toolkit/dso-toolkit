import { TemplateResult, html } from "lit-html";

import { InfoButton } from "../info-button/info-button.models.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

export const content = html`<p>Gemeente Nieuwegein informeert haar burgers graag over de Omgevingswet.</p>`;

export function infoButton(): InfoButton<TemplateResult> {
  return {
    label: 'Toon informatie over het "Omgevingsplan Nieuwegein"',
    children: richContentTemplate({ children: html`<p>Extra informatie over het "Omgevingsplan Nieuwegein"</p>` }),
    toggletipPlacement: "left",
  };
}
