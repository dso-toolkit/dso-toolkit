import { LabelDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: LabelDecorator<TemplateResult> = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
