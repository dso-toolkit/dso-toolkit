import { LegendItemDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: LegendItemDecorator<TemplateResult> = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
