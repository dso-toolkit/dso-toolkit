import { PlekinfoCardDecorator } from "dso-toolkit";
import { html,TemplateResult } from "lit-html";

export const decorator: PlekinfoCardDecorator<TemplateResult> = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
