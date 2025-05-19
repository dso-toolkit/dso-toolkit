import { TileGrid } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssTileGrid: ComponentImplementation<TileGrid> = {
  component: "tileGrid",
  implementation: "html-css",
  template: ({ tileTemplate }) =>
    function tileGridTemplate({ tiles }) {
      return html`<dso-responsive-element class="dso-tile-grid"
        >${tiles.map((t) => tileTemplate(t))}</dso-responsive-element
      >`;
    },
};
