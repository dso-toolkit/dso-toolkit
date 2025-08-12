export interface Header {
  label?: string;
  labelUrl?: string;
  logoUrl?: string;
  ribbon?: string;
  compact?: boolean;
  mainMenu?: HeaderMenuItem[];
  useDropDownMenu?: "always" | "auto";
  authStatus?: "none" | "loggedOut" | "loggedIn";
  loginUrl?: string;
  logoutUrl?: string;
  showHelp?: boolean;
  helpUrl?: string;
  userProfileName?: string;
  userProfileUrl?: string;
  userHomeUrl?: string;
  userHomeActive?: boolean;
  dsoHeaderClick?: (e: CustomEvent<HeaderClickEvent | HeaderClickMenuItemEvent>) => void;
}

export interface HeaderMenuItem {
  label: string;
  url: string;
  active?: boolean;
}

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
