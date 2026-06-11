import { MapControls, legendArgs } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { kaartlagenRichContent } from "../legend/legend.content";

export const coreMapControls: ComponentImplementation<MapControls> = {
  component: "mapControls",
  implementation: "core",
  template: () =>
    function mapControlsTemplate({ dsoZoomIn, dsoZoomOut, dsoToggle, open, disableZoom }) {
      return html`
        <dso-map-controls
          @dsoZoomIn=${dsoZoomIn}
          @dsoZoomOut=${dsoZoomOut}
          @dsoToggle=${dsoToggle}
          .disableZoom=${disableZoom}
          ?open=${open}
        >
          ${kaartlagenRichContent(legendArgs)}
        </dso-map-controls>
      `;
    },
};
