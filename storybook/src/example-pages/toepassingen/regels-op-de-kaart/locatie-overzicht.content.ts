import { Header, Breadcrumbs } from "dso-toolkit";

export const header: Header = {
  label: "Regels op de kaart",
  ribbon: "beta",
  mainMenu: [
    {
      label: "Home",
      url: "#",
    },
    {
      label: "Vergunningcheck",
      url: "#",
    },
    {
      label: "Aanvragen",
      url: "#",
    },
    {
      label: "Regels op de kaart",
      url: "#",
    },
    {
      label: "Maatregelen op maat",
      url: "#",
    },
  ],
  useDropDownMenu: "always",
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
