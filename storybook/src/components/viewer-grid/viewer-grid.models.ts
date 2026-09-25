import { TemplateResult } from "lit-html";

export interface ViewerGrid {
  filterPanelOpen?: boolean;
  filterPanelTitle?: string;
  overlayOpen?: boolean;
  documentPanelOpen?: boolean;
  print?: boolean;
  mainSize?: ViewerGridPanelSize;
  activeTab?: ViewerGridTab;
  documentPanelSize?: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoCloseOverlay?: (e: MouseEvent | KeyboardEvent | Event) => void;
  dsoCloseFilterPanel?: (e: MouseEvent | Event) => void;
  dsoActiveTabSwitch?: (e: CustomEvent<ViewerGridActiveTabSwitchEvent>) => void;
  dsoDocumentPanelSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoDocumentPanelSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoMainPanelToggle?: (e: CustomEvent<ViewerGridMainToggleEvent>) => void;
  topBar?: TemplateResult | string;
  filterPanel?: TemplateResult | string;
  main: TemplateResult | string;
  map: TemplateResult | string;
  legend?: TemplateResult | string;
  documentPanel?: TemplateResult | string;
  overlay?: TemplateResult | string;
}

export type ViewerGridPanelSize = "small" | "medium" | "large";
export type ViewerGridTab = "search" | "map" | "document";

export interface ViewerGridChangeSizeEvent {
  currentSize: ViewerGridPanelSize;
  nextSize: ViewerGridPanelSize;
}

export interface ViewerGridChangeSizeAnimationEndEvent {
  currentSize: ViewerGridPanelSize;
}

export interface ViewerGridActiveTabSwitchEvent {
  tab: ViewerGridTab;
}

export interface ViewerGridMainExpandEvent {
  expand: boolean;
}

export interface ViewerGridMainToggleEvent {
  hide: boolean;
}
