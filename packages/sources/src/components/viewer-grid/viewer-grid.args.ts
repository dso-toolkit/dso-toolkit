import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook";

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
    options: ['small', 'medium', 'large'],
    control: {
      type: 'select',
    }
  },
  dsoMainSizeChange: {
    ...noControl,
    action: 'dsoMainSizeChange'
  },
  dsoCloseOverlay: {
    ...noControl,
    action: "dsoCloseOverlay",
  },
  dsoFilterpanelCancel: {
    ...noControl,
    action: 'dsoFilterpanelCancel'
  },
  dsoFilterpanelApply: {
    ...noControl,
    action: 'dsoFilterpanelApply'
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

export function viewerGridArgsMapper(a: ViewerGridArgs): Required<any> {
  return { ...a };
}

export function viewerGridDocumentHeaderArgsMapper(a: ViewerGridDocumentHeaderArgs): Required<any> {
  return { ...a };
}
