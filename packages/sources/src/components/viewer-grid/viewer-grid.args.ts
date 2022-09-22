import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook";

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  initialMainSize?: "small" | "medium" | "large";
  onDsoMainSizeChange: HandlerFunction;
  onDsoCloseOverlay: HandlerFunction;
  onDsoFilterpanelCancel: HandlerFunction;
  onDsoFilterpanelApply: HandlerFunction;
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
  onDsoMainSizeChange: {
    ...noControl,
    action: 'onDsoMainSizeChange'
  },
  onDsoCloseOverlay: {
    ...noControl,
    action: "onDsoCloseOverlay",
  },
  onDsoFilterpanelCancel: {
    ...noControl,
    action: 'onDsoFilterpanelCancel'
  },
  onDsoFilterpanelApply: {
    ...noControl,
    action: 'onDsoFilterpanelApply'
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
