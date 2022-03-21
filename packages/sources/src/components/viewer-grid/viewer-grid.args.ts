import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../stories-helpers";

import { ViewerGridDemoProperties } from "./viewer-grid.models";

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  noOverlay: boolean;
  closeOverlay: HandlerFunction;
  filterpanelCancel: HandlerFunction;
  filterpanelApply: HandlerFunction;
  filterblokDeleteActiveFilter: HandlerFunction;
  allOptions: HandlerFunction;
  documentHeaderFeaturesOpen: boolean;
  documentHeaderMapAction: HandlerFunction;
  documentHeaderFeatureAction: HandlerFunction;
}

export const viewerGridArgTypes: ArgTypes<ViewerGridArgs> = {
  filterpanelOpen: {
    control: {
      type: "boolean",
    },
  },
  overlayOpen: {
    control: {
      type: "boolean",
    },
  },
  noOverlay: {
    name: "Geen overlay",
    control: {
      type: "boolean",
    },
  },
  documentHeaderFeaturesOpen: {
    control: {
      type: "boolean",
    },
  },
  closeOverlay: {
    ...noControl,
    action: "closeOverlay",
  },
  documentHeaderMapAction: {
    ...noControl,
    action: "documentHeaderMapAction",
  },
  documentHeaderFeatureAction: {
    ...noControl,
    action: "documentHeaderFeatureAction",
  },
  allOptions: {
    ...noControl,
    action: "allOptions",
  },
  filterblokDeleteActiveFilter: {
    ...noControl,
    action: "filterblokDeleteActiveFilter",
  },
  filterpanelCancel: {
    ...noControl,
    action: 'filterpanelCancel'
  },
  filterpanelApply: {
    ...noControl,
    action: 'filterpanelApply'
  },
};

export function viewerGridDemoArgsMapper(
  a: ViewerGridArgs
): ViewerGridDemoProperties {
  return {
    ...a,
  };
}
