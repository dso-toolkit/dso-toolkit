import { Label } from "../label/label.models.js";

export interface ViewerGrid<TemplateFnReturnType> {
  filterpanel?: TemplateFnReturnType;
  filterpanelOpen?: boolean;
  main: TemplateFnReturnType;
  map: TemplateFnReturnType;
  overlay?: TemplateFnReturnType;
  overlayOpen?: boolean;
  show?: boolean;
  initialMainSize?: "small" | "medium" | "large";
  dsoMainSizeChange?: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  dsoCloseOverlay?: (e: MouseEvent | KeyboardEvent) => void;
  dsoFilterpanelCancel?: (e: MouseEvent) => void;
  dsoFilterpanelApply?: (e: MouseEvent) => void;
}

export interface ViewerGridChangeSizeEvent {
  stage: "start" | "end";
  previousSize: string;
  currentSize: string;
}

export interface ViewerGridProperties {
  filterpanelOpen: boolean;
  overlayOpen: boolean;
  initialMainSize?: "small" | "medium" | "large";
  mainSizeChange: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  closeOverlay: (e: MouseEvent) => void;
  filterpanelCancel: (e: MouseEvent) => void;
  filterpanelApply: (e: MouseEvent) => void;
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
  documentHeaderStatusOpen: boolean;
  documentHeaderSticky: boolean;
}
