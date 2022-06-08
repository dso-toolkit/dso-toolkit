import { DefinitionList, Label, Tile } from "../..";

interface ViewerGridDemoProperties {
  filterpanelOpen: boolean;
  overlayOpen: boolean;
  noOverlay: boolean;
  initialMainSize?: "small" | "medium" | "large";
  mainSizeChange: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  closeOverlay: (e: MouseEvent) => void;
  filterpanelCancel: (e: MouseEvent) => void;
  filterpanelApply: (e: MouseEvent) => void;
}

export interface ViewerGridWithSearchResultsProperties extends ViewerGridDemoProperties {
  allOptions: (e: MouseEvent) => void;
  filterblokDeleteActiveFilter: (e: MouseEvent) => void;
  documentHeaderFeaturesOpen: boolean;
  documentHeaderMapAction: (e: MouseEvent) => void;
  documentHeaderFeatureAction: (e: MouseEvent) => void;
}

export interface ViewerGridWithTilesProperties extends ViewerGridDemoProperties {
  tiles: Tile[];
}

export interface ViewerGrid<TemplateFnReturnType> {
  filterpanel: TemplateFnReturnType;
  filterpanelOpen: boolean;
  main: TemplateFnReturnType;
  map: TemplateFnReturnType;
  overlay: TemplateFnReturnType;
  overlayOpen: boolean;
  noOverlay: boolean;
  initialMainSize?: "small" | "medium" | "large";
  mainSizeChange: (e: CustomEvent<ViewerGridChangeSizeEvent>) => void;
  closeOverlay: (e: MouseEvent) => void;
  filterpanelCancel: (e: MouseEvent) => void;
  filterpanelApply: (e: MouseEvent) => void;
}

export interface ViewerGridDocumentHeader<TemplateFnReturnType> {
  title: TemplateFnReturnType;
  type: string;
  owner: string;
  status: TemplateFnReturnType;
  features: DefinitionList<TemplateFnReturnType>;
  featuresOpen: boolean;
  mapAction: (e: MouseEvent) => void;
  featuresAction: (e: MouseEvent) => void;
}

export interface ViewerGridDocumentListItem<TemplateFnReturnType> {
  title: TemplateFnReturnType;
  type: string;
  owner: string;
  status: TemplateFnReturnType;
}

export interface ViewerGridFilterblok<TemplateFnReturnType> {
  title: TemplateFnReturnType;
  address: string;
  activeFilters: Label[];
  onAllOptions: (e: MouseEvent) => void;
}

export interface ViewerGridChangeSizeEvent {
  stage: 'start' | 'end';
  previousSize: string;
  currentSize: string;
}
