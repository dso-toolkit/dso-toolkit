import { html } from "lit-html";

import { tileTemplate } from "../tile/tile.template.js";

import { TileGrid } from "./tile-grid.models.js";

export function tileGridTemplate({ tiles }: TileGrid) {
  return html`<dso-responsive-element class="dso-tile-grid"
    >${tiles.map((t) => tileTemplate(t))}</dso-responsive-element
  >`;
}
