import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { mapControlsDemoCss } from "./map-controls.demo.js";

export const decorator: Decorator = (story) => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 600px; position: relative; overflow: hidden;">
    ${story()}
    <style>
      ${mapControlsDemoCss}
    </style>
  </div>
`;
