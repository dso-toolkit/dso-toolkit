export interface TijdreisBanner {
  dsoTijdreisBannerClick?: (e: CustomEvent<TijdreisBannerClickEvent>) => void;
}

export interface TijdreisBannerClickEvent {
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
