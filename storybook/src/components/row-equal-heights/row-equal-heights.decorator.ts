import { Decorator } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";

export const decorator = (story: Parameters<Decorator>[0]): TemplateResult =>
  html`<div class="container">${story()}</div>`;
