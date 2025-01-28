import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { ViewerGridPanelSize, ViewerGridMode, Tab, ViewerGrid } from "./viewer-grid.models.js";
import { ViewerGridTemplates } from "./viewer-grid.stories-of.js";
import { AdvancedSelect } from "../advanced-select";

const panelSizes = ["small", "medium", "large"];

export interface ViewerGridArgs {
  mode: ViewerGridMode;
  overlayOpen: boolean;
  filterpanelOpen: boolean;
  filterpanelTitle?: string;
  documentPanelOpen?: boolean;
  mainSize: ViewerGridPanelSize;
  vrkActiveTab?: Tab;
  vdkActiveTab?: Tab;
  documentPanelSize: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChange: HandlerFunction;
  dsoMainSizeChangeAnimationEnd: HandlerFunction;
  dsoCloseOverlay: HandlerFunction;
  dsoFilterpanelCancel: HandlerFunction;
  dsoFilterpanelApply: HandlerFunction;
  dsoCloseFilterpanel: HandlerFunction;
  dsoDocumentPanelSizeChange: HandlerFunction;
  dsoDocumentPanelSizeChangeAnimationEnd: HandlerFunction;
  dsoMainPanelExpand: HandlerFunction;
  dsoMainPanelToggle: HandlerFunction;
}

export interface ViewerGridDocumentHeaderArgs {
  documentHeaderFeaturesOpen: boolean;
  documentHeaderFeatureAction: HandlerFunction;
  documentHeaderSticky: boolean;
  documentHeaderAdvancedSelect: AdvancedSelect<unknown>;
  documentHeaderAdvancedSelectActiveIndex: number;
}

export const viewerGridArgTypes: ArgTypes<ViewerGridArgs> = {
  mode: {
    options: ["vdk", "vrk"],
    control: {
      type: "select",
      labels: {
        vrk: "VRK",
        vdk: "VDK",
      },
    },
  },
  filterpanelTitle: {
    control: {
      type: "text",
    },
    if: { arg: "mode", eq: "vdk" },
  },
  filterpanelOpen: {
    type: "boolean",
  },
  overlayOpen: {
    type: "boolean",
  },
  vrkActiveTab: {
    options: [undefined, "main", "map"],
    control: {
      type: "select",
    },
    if: { arg: "mode", eq: "vrk" },
  },
  vdkActiveTab: {
    options: [undefined, "search", "map", "document"],
    control: {
      type: "select",
    },
    if: { arg: "mode", eq: "vdk" },
  },
  documentPanelOpen: {
    type: "boolean",
    if: { arg: "mode", eq: "vdk" },
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
    if: { arg: "mode", eq: "vdk" },
  },
  mainPanelExpanded: {
    type: "boolean",
    if: { arg: "mode", eq: "vdk" },
  },
  mainPanelHidden: {
    type: "boolean",
    if: { arg: "mode", eq: "vdk" },
  },
  dsoMainSizeChange: {
    ...noControl,
    action: "dsoMainSizeChange",
  },
  dsoMainSizeChangeAnimationEnd: {
    ...noControl,
    action: "dsoMainSizeChangeAnimationEnd",
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

export const viewerGridDocumentHeaderArgs: ArgTypes<ViewerGridDocumentHeaderArgs> = {
  documentHeaderFeaturesOpen: {
    type: "boolean",
  },
  documentHeaderAdvancedSelectActiveIndex: {
    name: "Active option",
    control: {
      type: "number",
    },
  },
  documentHeaderFeatureAction: {
    ...noControl,
    action: "documentHeaderFeatureAction",
  },
  documentHeaderSticky: {
    type: "boolean",
  },
  documentHeaderAdvancedSelect: {
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
    activeTab: a.mode === "vdk" ? a.vdkActiveTab : a.vrkActiveTab,
  };
}
