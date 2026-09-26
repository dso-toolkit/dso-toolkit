import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

export const decorator: Decorator = (story) => html`<div class="container">${story()}</div>`;
