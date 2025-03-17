import { Breadcrumbs, Header } from "dso-toolkit";

export const header: Header = {
  useDropDownMenu: "auto",
  authStatus: "none",
  loginUrl: "#login",
  logoutUrl: "#logout",
  showHelp: false,
  userProfileName: "J.A. Jansen",
  userProfileUrl: "#profiel",
  userHomeUrl: "#myhome",
};

export const breadcrumbs: Breadcrumbs = {
  breadcrumbs: [
    {
      label: "Home",
      url: "#",
    },
    {
      label: "Checken",
      url: "#",
    },
  ],
};
