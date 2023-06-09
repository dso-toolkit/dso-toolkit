export interface Header {
  logo: string;
  subLogo?: string;
  mainMenu?: {
    label: string;
    url: string;
    active?: boolean;
  }[];
  useDropDownMenu?: "always" | "auto";
  authStatus?: "none" | "loggedOut" | "loggedIn";
  loginUrl?: string;
  logoutUrl?: string;
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

export type HeaderNavigationType = "menuItem" | "profile" | "logout" | "login" | "userHome";

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
