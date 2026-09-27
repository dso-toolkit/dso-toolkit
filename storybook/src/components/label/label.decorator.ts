import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { css } from "./label.demo.js";

export const decorator: Decorator = (story) => html`
  ${story()}

  <style>
    ${css}
  </style>
`;
