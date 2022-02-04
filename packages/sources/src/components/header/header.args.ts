import { ArgTypes, noControl } from "../../stories-helpers";
import { Header } from "./header.models";

export interface HeaderArgs {
  logo: string;
  subLogo: string;
  showSubLogo: boolean;
  mainMenu: {
    label: string;
    url: string;
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

export const HeaderArgTypes: ArgTypes<HeaderArgs> = {
  logo: noControl,
  subLogo: noControl,
  showSubLogo: {
    name: "Sub logo tonen",
    control: {
      type: "boolean",
    },
  },
  mainMenu: noControl,
  showDropDownMenu: {
    name: "Toon menu als dropdown",
    control: {
      type: "boolean",
    },
  },
  loginUrl: noControl,
  logoutUrl: noControl,
  showLoggedIn: {
    name: "In-/uitloggen tonen",
    control: {
      type: "boolean",
    },
  },
  isLoggedIn: {
    name: "Ingelogd",
    control: {
      type: "boolean",
    },
  },
  userProfileName: {
    name: "Naam gebruiker",
    control: {
      type: "text",
    },
  },
  userProfileUrl: noControl,
  userHomeUrl: {
    name: "Url naar gebruikersomgeving",
    control: {
      type: "text",
    },
  },
};

export function headerArgsMapper(a: HeaderArgs): Header {
  return {
    logo: a.logo,
    subLogo: a.subLogo,
    showSubLogo: a.showSubLogo,
    mainMenu: a.mainMenu,
    showDropDownMenu: a.showDropDownMenu,
    loginUrl: a.loginUrl,
    logoutUrl: a.logoutUrl,
    isLoggedIn: a.isLoggedIn,
    showLoggedIn: a.showLoggedIn,
    userProfileName: a.userProfileName,
    userProfileUrl: a.userProfileUrl,
    userHomeUrl: a.userHomeUrl,
  };
}
