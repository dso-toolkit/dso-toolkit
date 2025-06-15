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

export interface ViewerGridActiveTabSwitchEvent {
  tab: ViewerGridTab;
}

export interface ViewerGridMainExpandEvent {
  expand: boolean;
}

export interface ViewerGridMainToggleEvent {
  hide: boolean;
}

export type ViewerGridPanelSize = "small" | "medium" | "large";

export type ViewerGridLabelSizeMap = { [key in ViewerGridPanelSize]: string };

export const viewerGridTabs = ["search", "map", "document"] as const;
export type ViewerGridTab = (typeof viewerGridTabs)[number];

export type ViewerGridTabLabelMap = { [key in ViewerGridTab]: string };

export const viewerGridTabLabelMap: ViewerGridTabLabelMap = {
  map: "Kaart",
  document: "Document",
  search: "Zoeken",
};

export const viewerGridSizeLabelMap: ViewerGridLabelSizeMap = {
  small: "smal",
  medium: "middel",
  large: "breed",
};
