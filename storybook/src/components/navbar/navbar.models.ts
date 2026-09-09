import { TemplateResult } from "lit-html";

export interface Navbar {
  items: NavbarItem[];
  modifier: string;
  open: boolean;
  extension?: TemplateResult | string;
  extensionOpen?: boolean;
  extensionAnimation?: boolean;
  dsoExtensionToggle?(event: NavBarToggleExtensionEvent): void;
}

export interface NavbarItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface NavBarToggleExtensionEvent {
  originalEvent: MouseEvent;
  current: boolean;
  next: boolean;
}
