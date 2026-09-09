import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

export const decorator = (story: PartialStoryFn, css: string): TemplateResult => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
