export interface HeaderMenuItem {
  label: string;
  url: string;
  active?: boolean;
}

export type HeaderAuthStatus = "none" | "loggedOut" | "loggedIn";

export type HeaderCompactMode = "always" | "auto";

export type HeaderNavigationType = "menuItem" | "profile" | "logout" | "login" | "userHome" | "help";

export interface HeaderClickEvent {
  originalEvent: MouseEvent;
  type: HeaderNavigationType;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
  /** Url of the selected item. */
  url?: string;
}

export interface HeaderClickMenuItemEvent extends HeaderClickEvent {
  menuItem: HeaderMenuItem;
}

export type HeaderEvent = HeaderClickEvent | HeaderClickMenuItemEvent;
