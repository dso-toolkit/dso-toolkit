import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../stories-helpers";

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  initialMainSize?: "small" | "medium" | "large";
  mainSizeChange: HandlerFunction;
  closeOverlay: HandlerFunction;
  filterpanelCancel: HandlerFunction;
  filterpanelApply: HandlerFunction;
}

export interface ViewerGridDocumentHeaderArgs {
  documentHeaderFeaturesOpen: boolean;
  documentHeaderFeatureAction: HandlerFunction;
  documentHeaderStatusOpen: boolean;
}

export const viewerGridArgs: ArgTypes<ViewerGridArgs> = {
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
  filterpanelCancel: {
    ...noControl,
    action: 'filterpanelCancel'
  },
  filterpanelApply: {
    ...noControl,
    action: 'filterpanelApply'
  }
};

export const viewerGridDocumentHeaderArgs: ArgTypes<ViewerGridDocumentHeaderArgs> = {
  documentHeaderFeaturesOpen: {
    control: {
      type: "boolean",
    },
  },
  documentHeaderStatusOpen: {
    control: {
      type: "boolean",
    },
  },
  documentHeaderFeatureAction: {
    ...noControl,
    action: 'documentHeaderFeatureAction'
  }
};

export function viewerGridArgsMapper(
  a: ViewerGridArgs
): any {
  return {
    ...a,
  };
}

export function viewerGridDocumentHeaderArgsMapper(
  a: ViewerGridDocumentHeaderArgs
): any {
  return {
    ...a,
  };
}
