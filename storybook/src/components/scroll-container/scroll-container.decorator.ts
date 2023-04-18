import { DecoratorFunction } from "@storybook/addons";
import { html, TemplateResult } from "lit-html";

export const decorator: DecoratorFunction<TemplateResult> = (story) => html`
  <div id="scroll-container-mock" style="background-color: #efefef; height: 750px; max-width: 500px">${story()}</div>
`;
