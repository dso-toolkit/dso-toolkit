import type { Decorator } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";

export const decorator = (story: Parameters<Decorator>[0], css: string): TemplateResult => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 600px; position: relative; overflow: hidden;">
    ${story()}
    <style>
      ${css}
    </style>
  </div>
`;
