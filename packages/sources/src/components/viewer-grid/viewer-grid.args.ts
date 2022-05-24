import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../stories-helpers";
import { tiles } from './viewer-grid.content';

import { ViewerGridWithSearchResultsProperties, ViewerGridWithTilesProperties } from "./viewer-grid.models";

interface ViewerGridArgs {
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  noOverlay: boolean;
  initialMainSize?: "small" | "medium" | "large";
  mainSizeChange: HandlerFunction;
  closeOverlay: HandlerFunction;
  filterpanelCancel: HandlerFunction;
  filterpanelApply: HandlerFunction;
}

export interface ViewerGridWithSearchResultsArgs extends ViewerGridArgs {
  filterblokDeleteActiveFilter: HandlerFunction;
  allOptions: HandlerFunction;
  documentHeaderFeaturesOpen: boolean;
  documentHeaderMapAction: HandlerFunction;
  documentHeaderFeatureAction: HandlerFunction;
  documentHeaderStatusOpen: boolean;
}

export interface ViewerGridWithTilesArgs extends ViewerGridArgs {
}

export const viewerGridWithSearchResultsArgTypes: ArgTypes<ViewerGridWithSearchResultsArgs> = {
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
  documentHeaderStatusOpen: {
    control: {
      type: "boolean",
    },
  initialMainSize: {
    options: [undefined, 'small', 'medium', 'large'],
    control: {
      type: 'select',
    }
  },
  mainSizeChange: {
    ...noControl,
    action: 'mainSizeChange'
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

export const viewerGridWithTilesArgTypes: ArgTypes<{}> = {
}

export function viewerGridWithSearchResultsDemoArgsMapper(
  a: ViewerGridWithSearchResultsArgs
): ViewerGridWithSearchResultsProperties {
  return {
    ...a,
  };
}

export function viewerGridWithTilesDemoArgsMapper(
  a: ViewerGridWithTilesArgs
): ViewerGridWithTilesProperties {
  return {
    ...a,
    tiles
  };
}
