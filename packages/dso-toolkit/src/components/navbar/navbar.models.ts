export interface Navbar<TemplateFnReturnType> {
  items: NavbarItem[];
  modifier: string;
  open: boolean;
  extension?: TemplateFnReturnType;
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
