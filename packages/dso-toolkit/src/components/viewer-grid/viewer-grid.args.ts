import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook/index.js";

import { Tab, ViewerGrid, ViewerGridPanelSize } from "./viewer-grid.models.js";
import { ViewerGridTemplates } from "./viewer-grid.stories-of.js";

const panelSizes = ["small", "medium", "large"];

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterPanelOpen: boolean;
  filterPanelTitle?: string;
  documentPanelOpen?: boolean;
  mainSize: ViewerGridPanelSize;
  activeTab?: Tab;
  documentPanelSize: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChangeAnimationEnd: HandlerFunction;
  dsoCloseOverlay: HandlerFunction;
  dsoCloseFilterPanel: HandlerFunction;
  dsoDocumentPanelSizeChange: HandlerFunction;
  dsoDocumentPanelSizeChangeAnimationEnd: HandlerFunction;
  dsoMainPanelToggle: HandlerFunction;
  dsoActiveTabSwitch: HandlerFunction;
}

export const viewerGridArgTypes: ArgTypes<ViewerGridArgs> = {
  filterPanelTitle: {
    control: {
      type: "text",
    },
  },
  filterPanelOpen: {
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
  },
  dsoCloseOverlay: {
    ...noControl,
  },
  dsoCloseFilterPanel: {
    ...noControl,
  },
  dsoDocumentPanelSizeChange: {
    ...noControl,
  },
  dsoDocumentPanelSizeChangeAnimationEnd: {
    ...noControl,
  },
  dsoMainPanelToggle: {
    ...noControl,
  },
  dsoActiveTabSwitch: {
    ...noControl,
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
    dsoDocumentPanelSizeChange: (e) => a.dsoDocumentPanelSizeChange(e.detail),
    dsoMainPanelToggle: (e) => a.dsoMainPanelToggle(e.detail),
    dsoCloseFilterPanel: () => a.dsoCloseFilterPanel(),
    dsoCloseOverlay: () => a.dsoCloseOverlay(),
    dsoActiveTabSwitch: (e) => a.dsoActiveTabSwitch(e.detail),
    dsoDocumentPanelSizeChangeAnimationEnd: (e) => a.dsoDocumentPanelSizeChange(e.detail),
    dsoMainSizeChangeAnimationEnd: (e) => a.dsoMainSizeChangeAnimationEnd(e.detail),
  };
}
