import { PlekinfoCardDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: PlekinfoCardDecorator<TemplateResult> = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
