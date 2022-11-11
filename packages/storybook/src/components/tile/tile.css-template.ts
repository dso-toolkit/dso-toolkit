import { Tile } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ComponentImplementation } from "../../templates";

export const cssTile: ComponentImplementation<Tile> = {
  component: "tile",
  implementation: "css",
  template: ({ imageTemplate }) =>
    function tileTemplate({ anchor, image, label, variant }) {
      return html`
        <div class="dso-tile ${classMap({ "dso-theme": variant === "theme" })}">
          <a href=${anchor}>
            <span class="dso-tile-icon"> ${imageTemplate(image)} </span>
            <span class="dso-tile-link">${label}</span>
          </a>
        </div>
      `;
    },
};
