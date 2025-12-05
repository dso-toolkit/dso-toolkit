import { MapLayer } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreMapLayer: ComponentImplementation<MapLayer<TemplateResult>> = {
  component: "mapLayer",
  implementation: "core",
  template: () =>
    function mapLayerTemplate({ label, active, activatable, dsoActiveChange, objects }) {
      return html`<dso-map-layer
        label=${ifDefined(label)}
        ?activatable=${activatable}
        ?active=${active}
        @dsoActiveChange=${dsoActiveChange}
        >${objects.map(
          ({ label, active, dsoActiveChange, symboolCode }) =>
            html`<dso-map-layer-object ?active=${active} @dsoActiveChange=${dsoActiveChange}>
              ${label}
              ${symboolCode
                ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbol"></span>`
                : nothing}</dso-map-layer-object
            >`,
        )}</dso-map-layer
      >`;
    },
};
