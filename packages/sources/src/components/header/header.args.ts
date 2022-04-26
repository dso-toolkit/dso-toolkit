import { HandlerFunction } from "@storybook/addon-actions";
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
  useDropDownMenu: "always" | "never" | "auto";
  loginUrl: string;
  logoutUrl: string;
  isLoggedIn: boolean;
  showLoggedIn: boolean;
  userProfileName: string;
  userProfileUrl: string;
  userHomeUrl: string;
  menuItemClick: HandlerFunction;
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
  useDropDownMenu: {
    name: "Dropdown menu",
    options: ["always", "never", "auto"],
    control: {
      type: "select",
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
  menuItemClick: {
    ...noControl,
    action: "menuItemClick",
  },
};

export function headerArgsMapper(a: HeaderArgs): Header {
  return {
    logo: a.logo,
    subLogo: a.subLogo,
    showSubLogo: a.showSubLogo,
    mainMenu: a.mainMenu,
    useDropDownMenu: a.useDropDownMenu,
    loginUrl: a.loginUrl,
    logoutUrl: a.logoutUrl,
    isLoggedIn: a.isLoggedIn,
    showLoggedIn: a.showLoggedIn,
    userProfileName: a.userProfileName,
    userProfileUrl: a.userProfileUrl,
    userHomeUrl: a.userHomeUrl,
    menuItemClick: a.menuItemClick,
  };
}
