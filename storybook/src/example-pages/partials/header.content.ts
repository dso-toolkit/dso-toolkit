import { Breadcrumbs, Header } from "dso-toolkit";

export const header: Header = {
  mainMenu: [
    {
      label: "Home",
      url: "#",
    },
    {
      label: "Vergunningscheck",
      url: "#",
    },
    {
      label: "Aanvragen",
      url: "#",
    },
    {
      label: "Regels op de kaart",
      url: "#",
      active: true,
    },
    {
      label: "Mijn Omgevingsloket",
      url: "#",
    },
  ],
  useDropDownMenu: "auto",
  authStatus: "none",
  loginUrl: "#login",
  logoutUrl: "#logout",
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
