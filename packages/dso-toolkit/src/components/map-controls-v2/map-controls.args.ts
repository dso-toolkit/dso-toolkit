import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { baseLayers, overlays } from "./map-controls.content.js";
import { MapControlsV2 } from "./map-controls.models.js";
import {
  ButtonLabelMode,
  DisableZoom,
  buttonLabelMode,
  disableZoom,
} from "../map-controls-buttons/map-controls-buttons.models.js";
import { MapControlsMode, mapControlsMode } from "../map-controls-panel/map-controls-panel.models.js";

export interface MapControlsArgs {
  identifier: string;
  dsoZoomIn: HandlerFunction;
  dsoZoomOut: HandlerFunction;
  dsoToggle: HandlerFunction;
  open: boolean;
  baseLayers: typeof baseLayers;
  dsoBaseLayerChange: HandlerFunction;
  overlays: typeof overlays;
  dsoToggleOverlay: HandlerFunction;
  disableZoom: DisableZoom;
  enableMapLayers: boolean;
  mode: MapControlsMode;
  buttonLabel: string;
  panelTitle: string;
  buttonLabelMode: ButtonLabelMode;
  dsoClose: HandlerFunction;
}

export const mapControlsArgTypes: ArgTypes<MapControlsArgs> = {
  identifier: {
    type: "string",
  },
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
    options: ["none", ...disableZoom],
    control: {
      type: "select",
    },
  },
  enableMapLayers: {
    type: "boolean",
  },
  mode: {
    options: mapControlsMode,
    control: {
      type: "select",
    },
  },
  buttonLabel: {
    type: "string",
  },
  panelTitle: {
    type: "string",
  },
  buttonLabelMode: {
    options: buttonLabelMode,
    control: {
      type: "select",
    },
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
  },
};

export function mapControlsArgsMapper(a: MapControlsArgs): MapControlsV2 {
  return {
    mapControlsButtons: {
      identifier: a.identifier,
      open: a.open,
      disableZoom: a.disableZoom,
      enableMapLayers: a.enableMapLayers,
      buttonLabel: a.buttonLabel,
      buttonLabelMode: a.buttonLabelMode,
      dsoZoomIn: a.dsoZoomIn,
      dsoZoomOut: a.dsoZoomOut,
      dsoToggle: a.dsoToggle,
    },
    mapControlsPanel: {
      identifier: a.identifier,
      open: a.open,
      baseLayers: a.baseLayers,
      overlays: a.overlays,
      mode: a.mode,
      panelTitle: a.panelTitle,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- In deze library hebben we geen weet van de door Stencil gegenereerde Web Components
      dsoBaseLayerChange: (e: any) => {
        e.target.baseLayers = [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- In deze library hebben we geen weet van de door Stencil gegenereerde Web Components
          ...e.target.baseLayers.map((l: any) =>
            l.checked !== (l === e.detail.activeBaseLayer) ? { ...l, checked: l === e.detail.activeBaseLayer } : l
          ),
        ];

        a.dsoBaseLayerChange(e);
      },
      dsoToggleOverlay: a.dsoToggleOverlay,
      dsoClose: a.dsoClose,
    },
  };
}
