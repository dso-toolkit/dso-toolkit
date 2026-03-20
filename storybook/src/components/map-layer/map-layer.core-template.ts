import { MapLayer } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreMapLayer: ComponentImplementation<MapLayer<TemplateResult>> = {
  component: "mapLayer",
  implementation: "core",
  template: () =>
    function mapLayerTemplate({ active, activatable, dsoActiveChange, wijzigactie, nameSlot, labelSlot, objects }) {
      return html`<dso-map-layer
        ?active=${active}
        ?activatable=${activatable}
        @dsoActiveChange=${dsoActiveChange}
        wijzigactie=${ifDefined(wijzigactie)}
        >${nameSlot}${labelSlot ?? nothing}${objects.map(
          ({
            name,
            active,
            dsoActiveChange,
            dsoMouseEnter,
            dsoMouseLeave,
            symboolCode,
            wijzigactie: objectWijzigactie,
            labelSlot,
          }) =>
            html`<dso-map-layer-object
              ?active=${active}
              @dsoActiveChange=${dsoActiveChange}
              @dsoMouseEnter=${ifDefined(dsoMouseEnter)}
              @dsoMouseLeave=${ifDefined(dsoMouseLeave)}
              wijzigactie=${ifDefined(objectWijzigactie)}
            >
              ${name} ${labelSlot ?? nothing}
              ${symboolCode
                ? html`<span class="symboolcode" data-symboolcode=${symboolCode} slot="symbol"></span>`
                : nothing}</dso-map-layer-object
            >`,
        )}</dso-map-layer
      >`;
    },
};
