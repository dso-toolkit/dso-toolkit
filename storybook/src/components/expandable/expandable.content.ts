import { html, TemplateResult } from "lit-html";

import { Templates } from "../../templates";

export function expandableContent({ richContentTemplate }: Templates): TemplateResult {
  return richContentTemplate({
    slot: "expandable-content",
    children: html`<h3>Expandable</h3>
      <span>Dit is een expandable</span>`,
  });
}
