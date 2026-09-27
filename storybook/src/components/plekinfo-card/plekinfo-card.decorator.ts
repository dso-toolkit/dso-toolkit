import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { plekinfoCardDemoCss } from "./plekinfo-card.demo.js";

export const decorator: Decorator = (story) => html`
  ${story()}

  <style>
    ${plekinfoCardDemoCss}
  </style>
`;
