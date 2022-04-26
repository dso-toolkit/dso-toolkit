export interface Header {
  logo: string;
  subLogo: string;
  showSubLogo: boolean;
  mainMenu?: {
    label: string;
    url: string;
    active?: boolean;
  }[];
  useDropDownMenu: "always" | "never" | "auto";
  loginUrl: string;
  logoutUrl: string;
  isLoggedIn: boolean;
  showLoggedIn: boolean;
  userProfileName: string;
  userProfileUrl: string;
  userHomeUrl: string;
  menuItemClick: (value: CustomEvent<HeaderMenuItemClickEvent>) => void;
}

export interface HeaderMenuItemClickEvent {
  originalEvent: PointerEvent;
  menuItem: HeaderMenuItem;
}

export interface HeaderMenuItem {
  label: string;
  url: string;
  active?: boolean;
}
