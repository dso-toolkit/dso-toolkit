import type { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs.models.js";
import type { Header } from "../../../components/header/header.models.js";

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
