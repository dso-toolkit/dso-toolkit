import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Tab, ViewerGrid, ViewerGridPanelSize } from "./viewer-grid.models.js";
import { ViewerGridTemplates } from "./viewer-grid.stories-of.js";

const panelSizes = ["small", "medium", "large"];

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  filterpanelTitle?: string;
  documentPanelOpen?: boolean;
  mainSize: ViewerGridPanelSize;
  activeTab?: Tab;
  documentPanelSize: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChangeAnimationEnd: HandlerFunction;
  dsoCloseOverlay: HandlerFunction;
  dsoCloseFilterpanel: HandlerFunction;
  dsoDocumentPanelSizeChange: HandlerFunction;
  dsoDocumentPanelSizeChangeAnimationEnd: HandlerFunction;
  dsoMainPanelExpand: HandlerFunction;
  dsoMainPanelToggle: HandlerFunction;
}

export const viewerGridArgTypes: ArgTypes<ViewerGridArgs> = {
  filterpanelTitle: {
    control: {
      type: "text",
    },
  },
  filterpanelOpen: {
    type: "boolean",
  },
  overlayOpen: {
    type: "boolean",
  },
  activeTab: {
    options: [undefined, "search", "map", "document"],
    control: {
      type: "select",
    },
  },
  documentPanelOpen: {
    control: {
      type: "boolean",
    },
  },
  mainSize: {
    options: panelSizes,
    control: {
      type: "select",
    },
  },
  documentPanelSize: {
    options: panelSizes,
    control: {
      type: "select",
    },
  },
  mainPanelExpanded: {
    type: "boolean",
  },
  mainPanelHidden: {
    type: "boolean",
  },
  dsoMainSizeChangeAnimationEnd: {
    ...noControl,
    action: "dsoMainSizeChangeAnimationEnd",
  },
  dsoCloseOverlay: {
    ...noControl,
    action: "dsoCloseOverlay",
  },
  dsoCloseFilterpanel: {
    ...noControl,
    action: "dsoCloseFilterpanel",
  },
  dsoDocumentPanelSizeChange: {
    ...noControl,
    action: "dsoDocumentPanelSizeChange",
  },
  dsoDocumentPanelSizeChangeAnimationEnd: {
    ...noControl,
    action: "dsoDocumentPanelSizeChangeAnimationEnd",
  },
  dsoMainPanelExpand: {
    ...noControl,
    action: "dsoMainPanelExpand",
  },
  dsoMainPanelToggle: {
    ...noControl,
    action: "dsoMainPanelToggle",
  },
};

export function viewerGridArgsMapper<TemplateFnReturnType>(
  a: ViewerGridArgs,
  example: ViewerGridTemplates<TemplateFnReturnType>["example"],
): ViewerGrid<TemplateFnReturnType> {
  return {
    ...a,
    ...example,
    main: example.main(a.mainPanelExpanded!),
    activeTab: a.activeTab,
  };
}
