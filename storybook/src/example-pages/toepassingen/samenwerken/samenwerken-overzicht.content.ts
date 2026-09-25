import { Breadcrumbs } from "../../../components/breadcrumbs/breadcrumbs.models.js";
import { Header } from "../../../components/header/header.models.js";

export function header(): Header {
  return {
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
}

export function breadcrumbs(): Breadcrumbs {
  return {
    breadcrumbs: [
      {
        label: "Test",
        url: "#",
      },
    ],
  };
}
