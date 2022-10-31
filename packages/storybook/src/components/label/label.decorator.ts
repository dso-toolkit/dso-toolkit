import { LabelParameters } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export const decorator: LabelParameters<TemplateResult>["decorator"] = (story, css) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
