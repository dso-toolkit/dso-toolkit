import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

export const decorator: Decorator = (story) => html`
  <div style="max-width: 220px; border: 1px dashed #ccc; padding: 8px;">${story()}</div>
`;
