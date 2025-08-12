export interface Logo {
  name?: string;
  label?: string;
  labelUrl?: string;
  logoUrl?: string;
  ribbon?: string;
  compact?: boolean;
  dsoLogoClick?: (e: CustomEvent<LogoClickEvent>) => void;
  dsoLabelClick?: (e: CustomEvent<LogoLabelClickEvent>) => void;
}

interface LogoClickEvent {
  originalEvent: MouseEvent;
  url: string;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

interface LogoLabelClickEvent {
  originalEvent: MouseEvent;
  url: string;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
