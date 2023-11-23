import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { baseLayers, overlays } from "./map-controls.content.js";
import { MapControls } from "./map-controls.models.js";

export interface MapControlsArgs {
  dsoZoomIn: HandlerFunction;
  dsoZoomOut: HandlerFunction;
  dsoToggle: HandlerFunction;
  open: boolean;
  baseLayers: typeof baseLayers;
  dsoBaseLayerChange: HandlerFunction;
  overlays: typeof overlays;
  dsoToggleOverlay: HandlerFunction;
  disableZoom: "both" | "in" | "out";
}

export const mapControlsArgTypes: ArgTypes<MapControlsArgs> = {
  open: {
    type: "boolean",
  },
  dsoZoomIn: {
    ...noControl,
    action: "dsoZoomIn",
  },
  dsoZoomOut: {
    ...noControl,
    action: "dsoZoomOut",
  },
  dsoToggle: {
    ...noControl,
    action: "dsoToggle",
  },
  baseLayers: {
    ...noControl,
  },
  dsoBaseLayerChange: {
    ...noControl,
    action: "dsoBaseLayerChange",
  },
  overlays: {
    ...noControl,
  },
  dsoToggleOverlay: {
    ...noControl,
    action: "dsoToggleOverlay",
  },
  disableZoom: {
    options: ["both", "in", "out"],
    control: {
      type: "select",
    },
  },
};

export function mapControlsArgsMapper(a: MapControlsArgs): Required<MapControls> {
  return {
    ...a,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- In deze library weten hebben we geen weet van de door Stencil gegenereerde Web Components
    dsoBaseLayerChange: (e: any) => {
      e.target.baseLayers = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- In deze library weten hebben we geen weet van de door Stencil gegenereerde Web Components
        ...e.target.baseLayers.map((l: any) =>
          l.checked !== (l === e.detail.activeBaseLayer) ? { ...l, checked: l === e.detail.activeBaseLayer } : l,
        ),
      ];

      a.dsoBaseLayerChange(e);
    },
  };
}
