import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

export const decorator = (story: PartialStoryFn, css: string): TemplateResult => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 600px; position: relative; overflow: hidden;">
    ${story()}
    <style>
      ${css}
    </style>
  </div>
`;
