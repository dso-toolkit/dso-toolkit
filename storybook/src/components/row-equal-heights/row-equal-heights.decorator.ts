import { DecoratorFunction } from "@storybook/addons";
import { html, TemplateResult } from "lit-html";

export const decorator: DecoratorFunction<TemplateResult> = (story) => html`<div class="container">${story()}</div>`;
