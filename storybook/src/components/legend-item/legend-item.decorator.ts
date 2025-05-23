import { LegendItemDecorator } from "dso-toolkit";
import { html,TemplateResult } from "lit-html";

export const decorator: LegendItemDecorator<TemplateResult> = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
