export interface ViewerGrid<TemplateFnReturnType> {
  filterpanelOpen?: boolean;
  filterpanelTitle?: string;
  overlayOpen?: boolean;
  documentPanelOpen?: boolean;
  mainSize?: ViewerGridPanelSize;
  activeTab?: Tab;
  documentPanelSize?: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoCloseOverlay?: (e: MouseEvent | KeyboardEvent | Event) => void;
  dsoCloseFilterpanel?: (e: MouseEvent | Event) => void;
  dsoActiveTabSwitch?: (e: CustomEvent<ViewerGridActiveTabSwitchEvent>) => void;
  dsoDocumentPanelSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoDocumentPanelSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoMainPanelExpand?: (e: CustomEvent<ViewerGridMainExpandEvent>) => void;
  dsoMainPanelToggle?: (e: CustomEvent<ViewerGridMainToggleEvent>) => void;
  topBar?: TemplateFnReturnType;
  filterpanel?: TemplateFnReturnType;
  main: TemplateFnReturnType;
  map: TemplateFnReturnType;
  documentPanel?: TemplateFnReturnType;
  overlay?: TemplateFnReturnType;
}

export type ViewerGridPanelSize = "small" | "medium" | "large";
export type Tab = "search" | "map" | "document" | "main";

export interface ViewerGridChangeSizeEvent {
  currentSize: ViewerGridPanelSize;
  nextSize: ViewerGridPanelSize;
}

export interface ViewerGridChangeSizeAnimationEndEvent {
  currentSize: ViewerGridPanelSize;
}

export interface ViewerGridActiveTabSwitchEvent {
  tab: Tab;
}

export interface ViewerGridMainExpandEvent {
  expand: boolean;
}

export interface ViewerGridMainToggleEvent {
  hide: boolean;
}
