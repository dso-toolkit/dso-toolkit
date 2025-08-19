import { Breadcrumbs, Header } from "dso-toolkit";

export const header: Header = {
  label: "Regels op de kaart",
  ribbon: "beta",
  mainMenu: [
    {
      label: "Behandelen",
      url: "#",
    },
  ],
  compact: "auto",
  authStatus: "loggedIn",
  loginUrl: "#login",
  logoutUrl: "#logout",
  showHelp: true,
  helpUrl: "#help",
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
