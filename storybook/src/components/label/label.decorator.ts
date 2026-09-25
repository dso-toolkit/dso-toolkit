import { Decorator } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";

export const decorator = (story: Parameters<Decorator>[0], css: string): TemplateResult => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
