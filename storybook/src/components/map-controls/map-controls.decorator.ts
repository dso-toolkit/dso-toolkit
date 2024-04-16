import { Addon_DecoratorFunction } from "@storybook/types";
import { html, TemplateResult } from "lit-html";
import { legendItemDemoCss } from "dso-toolkit";

export const decorator: Addon_DecoratorFunction<TemplateResult> = (story) => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 600px; position: relative; overflow: hidden;">
    ${story()}
    <style>
      ${legendItemDemoCss}
    </style>
  </div>
`;
