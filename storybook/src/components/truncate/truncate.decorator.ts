import { TruncateDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: TruncateDecorator<TemplateResult> = (story) => html`
  <div style="max-width: 220px; border: 1px dashed #ccc; padding: 8px;">${story()}</div>
`;
