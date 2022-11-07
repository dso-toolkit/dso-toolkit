import { TileGrid } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssTileGrid: ComponentImplementation<TileGrid<TemplateResult>> = {
  component: "tileGrid",
  implementation: "css",
  template: () =>
    function tileGridTemplate({ children }) {
      return html`<dso-responsive-element class="dso-tile-grid"> ${children} </dso-responsive-element>`;
    },
};
