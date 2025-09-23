import { NavbarItem } from "../navbar";

export interface Legend {
  children: TemplateFnReturnType;
  navbarItems: NavbarItem[];
  dsoNavbarClick?: (e: CustomEvent<LegendNavbarClickEvent>) => void;
  dsoClose?: (e: CustomEvent) => void;
}
