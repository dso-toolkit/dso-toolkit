import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { imageTemplate } from "../image/image.template.js";

import { Tile } from "./tile.models.js";

export function tileTemplate({ anchor, image, label, variant }: Tile) {
  return html`
    <div class="dso-tile ${classMap({ "dso-theme": variant === "theme" })}">
      <a href=${anchor}>
        <span class="dso-tile-icon">${imageTemplate(image)}</span>
        <span class="dso-tile-link">${label}</span>
      </a>
    </div>
  `;
}
