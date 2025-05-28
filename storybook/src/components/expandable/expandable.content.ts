import { TemplateResult, html } from "lit-html";

import { Templates } from "../../templates";

export function expandableContent({ richContentTemplate }: Templates): TemplateResult {
  return richContentTemplate({
    children: html`<h3>Expandable</h3>
      <span>Dit is een expandable</span>`,
  });
}
