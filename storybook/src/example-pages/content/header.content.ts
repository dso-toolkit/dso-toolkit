import type { Breadcrumbs } from "../../components/breadcrumbs/breadcrumbs.models.js";
import type { Header } from "../../components/header/header.models.js";

export const header: Header = {
  compact: "auto",
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
