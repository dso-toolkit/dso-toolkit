import { DecoratorFunction } from "@storybook/addons";
import { html, TemplateResult } from "lit-html";

export const decorator: DecoratorFunction<TemplateResult> = (story) => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 500px; position: relative; overflow: hidden;">
    ${story()}
  </div>
`;
