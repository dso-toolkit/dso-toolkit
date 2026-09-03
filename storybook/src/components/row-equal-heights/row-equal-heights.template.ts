import { TemplateResult, html } from "lit-html";

import { RowEqualHeights } from "./row-equal-heights.models.js";

export function rowEqualHeightsTemplate({ children }: RowEqualHeights<TemplateResult>) {
  return html`<div class="row dso-equal-heights">${children}</div>`;
}
