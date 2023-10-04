import { Breadcrumbs, Header } from "dso-toolkit";

export const header: Header = {
  subLogo: "Regels op de kaart",
  ribbon: "Beta",
  mainMenu: [
    {
      label: "Behandelen",
      url: "#",
    },
  ],
  useDropDownMenu: "auto",
  authStatus: "loggedIn",
  loginUrl: "#login",
  logoutUrl: "#logout",
  userProfileName: "J.A. Jansen",
  userProfileUrl: "#profiel",
};

export const breadcrumbs: Breadcrumbs = {
  breadcrumbs: [
    {
      label: "Test",
      url: "#",
    },
  ],
};
