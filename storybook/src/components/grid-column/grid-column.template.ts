import { TemplateResult, html } from "lit-html";

import { GridColumn } from "./grid-column.models.js";

export function gridColumnTemplate({ columns, overlay, dsoClose, content }: GridColumn<TemplateResult>) {
  return html`<dso-grid-column .columns=${columns} ?overlay=${overlay} @dsoClose=${dsoClose}>
    ${content}
  </dso-grid-column>`;
}
