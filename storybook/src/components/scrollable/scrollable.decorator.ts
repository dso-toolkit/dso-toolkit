import { Addon_DecoratorFunction } from "@storybook/types";
import { html, TemplateResult } from "lit-html";

export const decorator: Addon_DecoratorFunction<TemplateResult> = (story) => html`
  <div id="scrollable-mock" style="background-color: #efefef; display: flex; height: 750px; max-width: 500px">
    ${story()}
  </div>
`;
