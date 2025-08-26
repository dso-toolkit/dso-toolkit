import { IconButtonDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: IconButtonDecorator<TemplateResult> = (story) => html`
  <div style="padding: 2rem">${story()}</div>
`;
