export interface Header {
  logo: string;
  subLogo: string;
  showSubLogo: boolean;
  mainMenu: {
    label: string;
    url: string;
    active?: boolean;
  }[];
  showDropDownMenu: boolean;
  loginUrl: string;
  logoutUrl: string;
  isLoggedIn: boolean;
  showLoggedIn: boolean;
  userProfileName: string;
  userProfileUrl: string;
  userHomeUrl: string;
}
