export interface LogoClickEvent {
  originalEvent: MouseEvent;
  url: string;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export interface LogoLabelClickEvent {
  originalEvent: MouseEvent;
  url: string;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
