import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { ViewerGrid, ViewerGridPanelSize, ViewerGridTab } from "./viewer-grid.models.js";

const panelSizes = ["small", "medium", "large"];

export interface ViewerGridExample {
  topBar?: TemplateResult | string;
  main: (mainExpanded: boolean) => TemplateResult;
  map: TemplateResult | string;
  documentPanel: TemplateResult | string;
  filterPanel: TemplateResult | string;
  overlay: TemplateResult | string;
}

export interface ViewerGridArgs {
  overlayOpen: boolean;
  filterPanelOpen: boolean;
  filterPanelTitle?: string;
  documentPanelOpen?: boolean;
  print?: boolean;
  mainSize: ViewerGridPanelSize;
  activeTab?: ViewerGridTab;
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
    control: {
      type: "boolean",
    },
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
  print: {
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
  dsoMainSizeChangeAnimationEnd: argTypeAction(),
  dsoCloseOverlay: argTypeAction(),
  dsoCloseFilterPanel: argTypeAction(),
  dsoDocumentPanelSizeChange: argTypeAction(),
  dsoDocumentPanelSizeChangeAnimationEnd: argTypeAction(),
  dsoMainPanelToggle: argTypeAction(),
  dsoActiveTabSwitch: argTypeAction(),
};

export function viewerGridArgsMapper(a: ViewerGridArgs, example: ViewerGridExample): ViewerGrid {
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
