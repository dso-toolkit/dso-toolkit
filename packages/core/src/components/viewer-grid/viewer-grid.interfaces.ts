export interface ViewerGridChangeSizeEvent {
  currentSize: ViewerGridPanelSize;
  nextSize: ViewerGridPanelSize;
}

export interface ViewerGridChangeSizeAnimationEndEvent {
  currentSize: ViewerGridPanelSize;
}

export interface ViewerGridCloseOverlayEvent {
  originalEvent: MouseEvent | Event;
}

export interface ViewerGridCloseFilterpanelEvent {
  originalEvent: MouseEvent | Event;
}

export interface ViewerGridFilterpanelCancelEvent {
  originalEvent: MouseEvent | Event;
}

export interface ViewerGridFilterpanelApplyEvent {
  originalEvent: MouseEvent | Event;
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

export type ViewerGridMode = "vdk" | "vrk";

export type ViewerGridPanelSize = "small" | "medium" | "large";

export type ViewerGridLabelSizeMap = { [key in ViewerGridPanelSize]: string };

export const viewerGridVrkTabs = ["main", "map"] as const;
export type ViewerGridVrkTab = (typeof viewerGridVrkTabs)[number];

export const viewerGridVdkTabs = ["search", "map", "document"] as const;
export type ViewerGridVdkTab = (typeof viewerGridVdkTabs)[number];

export type ViewerGridTab = ViewerGridVrkTab | ViewerGridVdkTab;

export type ViewerGridTabLabelMap = { [key in ViewerGridTab]: string };

export const viewerGridTabLabelMap: ViewerGridTabLabelMap = {
  main: "Hoofdpaneel",
  map: "Kaart",
  document: "Document",
  search: "Zoeken",
};

export const viewerGridSizeLabelMap: ViewerGridLabelSizeMap = {
  small: "smal",
  medium: "middel",
  large: "breed",
};
