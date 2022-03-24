import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../stories-helpers";

import { ViewerGridDefaultDemoProperties } from "./viewer-grid.models";

import { ViewerGridThemesDemoProperties } from "./viewer-grid.models";

export interface ViewerGridArgs {
  overlayOpen: boolean;
  noOverlay: boolean;
  closeOverlay: HandlerFunction;
  filterblokDeleteActiveFilter: HandlerFunction;
  allOptions: HandlerFunction;
  documentHeaderFeaturesOpen: boolean;
  documentHeaderMapAction: HandlerFunction;
  documentHeaderFeatureAction: HandlerFunction;
}

export const viewerGridArgTypes: ArgTypes<ViewerGridArgs> = {
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
};

export function viewerGridDemoArgsMapper(
  a: ViewerGridArgs
): ViewerGridDefaultDemoProperties {
  return {
    ...a,
  };
}
