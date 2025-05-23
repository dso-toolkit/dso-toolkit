import { LabelDecorator } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const decorator: LabelDecorator<TemplateResult> = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
