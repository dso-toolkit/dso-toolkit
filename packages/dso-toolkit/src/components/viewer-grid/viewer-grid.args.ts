import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  initialMainSize: "small" | "medium" | "large";
  dsoMainSizeChange: HandlerFunction;
  dsoCloseOverlay: HandlerFunction;
  dsoFilterpanelCancel: HandlerFunction;
  dsoFilterpanelApply: HandlerFunction;
}

export interface ViewerGridDocumentHeaderArgs {
  documentHeaderFeaturesOpen: boolean;
  documentHeaderFeatureAction: HandlerFunction;
  documentHeaderStatusOpen: boolean;
  documentHeaderSticky: boolean;
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
  initialMainSize: {
    options: ["small", "medium", "large"],
    control: {
      type: "select",
    },
  },
  dsoMainSizeChange: {
    ...noControl,
    action: "dsoMainSizeChange",
  },
  dsoCloseOverlay: {
    ...noControl,
    action: "dsoCloseOverlay",
  },
  dsoFilterpanelCancel: {
    ...noControl,
    action: "dsoFilterpanelCancel",
  },
  dsoFilterpanelApply: {
    ...noControl,
    action: "dsoFilterpanelApply",
  },
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
    action: "documentHeaderFeatureAction",
  },
  documentHeaderSticky: {
    control: {
      type: "boolean",
    },
  },
};

export function viewerGridArgsMapper(a: ViewerGridArgs): Required<unknown> {
  return { ...a };
}

export function viewerGridDocumentHeaderArgsMapper(a: ViewerGridDocumentHeaderArgs): Required<unknown> {
  return { ...a };
}
