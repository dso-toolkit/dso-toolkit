import { RowEqualHeightsDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: RowEqualHeightsDecorator<TemplateResult> = (story) =>
  html`<div class="container">${story()}</div>`;
