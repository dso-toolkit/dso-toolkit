import { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs.models.js";
import { Header } from "../../components/header/header.models.js";

export function header(): Header {
  return {
    compact: "auto",
    authStatus: "none",
    loginUrl: "#login",
    logoutUrl: "#logout",
    showHelp: false,
    userProfileName: "J.A. Jansen",
    userProfileUrl: "#profiel",
    userHomeUrl: "#myhome",
  };
}

export function breadcrumbs(): Breadcrumbs {
  return {
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
}
