import { MapControlsV2 } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreMapControlsV2: ComponentImplementation<MapControlsV2> = {
  component: "mapControlsV2",
  implementation: "core",
  template: ({ mapControlsButtonsTemplate, mapControlsPanelTemplate }) =>
    function mapControls({ mapControlsButtons, mapControlsPanel }) {
      return html`
        ${mapControlsButtons ? mapControlsButtonsTemplate(mapControlsButtons) : nothing}
        ${mapControlsPanel ? mapControlsPanelTemplate(mapControlsPanel) : nothing}
      `;
    },
};
