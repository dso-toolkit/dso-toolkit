import { NavbarItem } from "../navbar";

export interface Legend<TemplateFnReturnType> {
  children?: TemplateFnReturnType;
  navbarItems: NavbarItem[];
  dsoNavbarClick?: (e: CustomEvent<LegendNavbarClickEvent>) => void;
  dsoClose?: (e: CustomEvent<LegendCloseEvent>) => void;
}

export interface LegendNavbarClickEvent {
  originalEvent: MouseEvent;
  /** True when user clicked the card while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

export interface LegendCloseEvent {
  originalEvent?: MouseEvent | Event;
}
