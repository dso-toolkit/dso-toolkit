import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes, noControl } from "../../storybook/index.js";

import { Header } from "./header.models.js";

export interface HeaderArgs {
  logo: string;
  subLogo: string;
  showSubLogo: boolean;
  mainMenu: {
    label: string;
    url: string;
  }[];
  noMainMenu: boolean;
  useDropDownMenu: "always" | "never" | "auto";
  authStatus: "none" | "loggedOut" | "loggedIn";
  loginUrl: string;
  logoutUrl: string;
  userProfileName: string;
  userProfileUrl: string;
  userHomeUrl: string;
  dsoHeaderClick: HandlerFunction;
}

export const headerArgTypes: ArgTypes<HeaderArgs> = {
  logo: noControl,
  subLogo: noControl,
  showSubLogo: {
    name: "Sub logo tonen",
    control: {
      type: "boolean",
    },
  },
  mainMenu: noControl,
  noMainMenu: {
    name: "Geen menu",
    control: {
      type: "boolean",
    },
  },
  useDropDownMenu: {
    name: "Dropdown menu",
    options: ["always", "never", "auto"],
    control: {
      type: "select",
    },
  },
  authStatus: {
    name: "Authenticatie",
    options: ["none", "loggedOut", "loggedIn"],
    control: {
      type: "select",
    },
  },
  loginUrl: {
    name: "Inloggen url",
    control: {
      type: "text",
    },
  },
  logoutUrl: {
    name: "Uitloggen url",
    control: {
      type: "text",
    },
  },
  userHomeUrl: {
    name: "Url naar gebruikersomgeving",
    control: {
      type: "text",
    },
  },
  userProfileUrl: noControl,
  userProfileName: {
    name: "Naam gebruiker",
    control: {
      type: "text",
    },
  },
  dsoHeaderClick: {
    ...noControl,
    action: "dsoHeaderClick",
  },
};

export function headerArgsMapper(a: HeaderArgs): Required<Header> {
  return {
    ...a,
    subLogo: a.showSubLogo ? a.subLogo : "",
    mainMenu: a.noMainMenu ? [] : a.mainMenu,
    dsoHeaderClick: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoHeaderClick(event);
    },
  };
}
