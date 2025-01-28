import { Label } from "../label/label.models.js";
import { AdvancedSelect } from "../advanced-select";

export interface ViewerGrid<TemplateFnReturnType> {
  mode?: ViewerGridMode;
  filterpanelOpen?: boolean;
  filterpanelTitle?: string;
  overlayOpen?: boolean;
  documentPanelOpen?: boolean;
  mainSize?: ViewerGridPanelSize;
  activeTab?: Tab;
  documentPanelSize?: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoMainSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoCloseOverlay?: (e: MouseEvent | KeyboardEvent | Event) => void;
  dsoFilterpanelCancel?: (e: MouseEvent | Event) => void;
  dsoFilterpanelApply?: (e: MouseEvent | Event) => void;
  dsoCloseFilterpanel?: (e: MouseEvent | Event) => void;
  dsoActiveTabSwitch?: (e: CustomEvent<ViewerGridActiveTabSwitchEvent>) => void;
  dsoDocumentPanelSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoDocumentPanelSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoMainPanelExpand?: (e: CustomEvent<ViewerGridMainExpandEvent>) => void;
  dsoMainPanelToggle?: (e: CustomEvent<ViewerGridMainToggleEvent>) => void;
  filterpanel?: TemplateFnReturnType;
  main: TemplateFnReturnType;
  map: TemplateFnReturnType;
  documentPanel?: TemplateFnReturnType;
  overlay?: TemplateFnReturnType;
}

export type ViewerGridMode = "vdk" | "vrk";
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

export interface ViewerGridProperties {
  mode?: ViewerGridMode;
  filterpanelOpen?: boolean;
  filterpanelTitle?: string;
  overlayOpen?: boolean;
  documentPanelOpen?: boolean;
  mainSize?: ViewerGridPanelSize;
  activeTab?: Tab;
  documentPanelSize?: ViewerGridPanelSize;
  mainPanelExpanded?: boolean;
  mainPanelHidden?: boolean;
  dsoMainSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoMainSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoCloseOverlay?: (e: MouseEvent | KeyboardEvent | Event) => void;
  dsoFilterpanelCancel?: (e: MouseEvent | Event) => void;
  dsoFilterpanelApply?: (e: MouseEvent | Event) => void;
  dsoCloseFilterpanel?: (e: MouseEvent | Event) => void;
  dsoActiveTabSwitch?: (e: CustomEvent<ViewerGridActiveTabSwitchEvent>) => void;
  dsoDocumentPanelSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoDocumentPanelSizeChangeAnimationEnd?: (e: CustomEvent<ViewerGridChangeSizeAnimationEndEvent>) => void;
  dsoMainPanelExpand?: (e: CustomEvent<ViewerGridMainExpandEvent>) => void;
  dsoMainPanelToggle?: (e: CustomEvent<ViewerGridMainToggleEvent>) => void;
}

export interface ViewerGridFilterblokProperties<TemplateFnReturnType> {
  title: TemplateFnReturnType;
  address: string;
  activeFilters: Label[];
  onAllOptions: (e: MouseEvent) => void;
  filterblokAllOptions: (e: MouseEvent) => void;
  filterblokDeleteActiveFilter: (e: MouseEvent) => void;
}

export interface ViewerGridDocumentHeaderProperties {
  documentHeaderFeaturesOpen: boolean;
  documentHeaderFeatureAction: (e: MouseEvent) => void;
  documentHeaderSticky: boolean;
  documentHeaderAdvancedSelect: AdvancedSelect<unknown>;
  documentHeaderAdvancedSelectActiveIndex: number;
}
