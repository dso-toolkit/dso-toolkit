import { NavbarItem } from "../navbar";

export interface Legend<TemplateFnReturnType> {
  content?: TemplateFnReturnType;
  navbarItems: NavbarItem[];
  dsoLegendNavbarItemClick?: (e: CustomEvent<LegendNavbarItemClickEvent>) => void;
  dsoClose?: (e: CustomEvent<LegendCloseEvent>) => void;
}

export interface LegendNavbarItemClickEvent {
  navbarItem: NavbarItem;
}

export interface LegendCloseEvent {
  originalEvent?: MouseEvent | Event;
}
