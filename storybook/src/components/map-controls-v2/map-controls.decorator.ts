import { Addon_DecoratorFunction } from "@storybook/types";
import { html, TemplateResult } from "lit-html";

export const decorator: Addon_DecoratorFunction<TemplateResult> = (story) => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 500px; position: relative; overflow: hidden;">
    ${story()}
  </div>
`;
