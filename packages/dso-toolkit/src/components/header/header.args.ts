import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction, noControl } from "../../storybook";

import { Header } from "./header.models.js";

export interface HeaderArgs {
  label: string;
  labelUrl: string;
  logoUrl: string;
  ribbon: string;
  mainMenu: {
    label: string;
    url: string;
    active?: boolean;
  }[];
  noMainMenu: boolean;
  useDropDownMenu: "always" | "auto";
  authStatus: "none" | "loggedOut" | "loggedIn";
  loginUrl: string;
  logoutUrl: string;
  showHelp: boolean;
  helpUrl: string;
  userProfileName: string;
  userProfileUrl: string;
  userHomeUrl: string;
  userHomeActive: boolean;
  dsoHeaderClick: HandlerFunction;
}

export const headerArgTypes: ArgTypes<HeaderArgs> = {
  label: noControl,
  labelUrl: noControl,
  logoUrl: noControl,
  ribbon: noControl,
  mainMenu: noControl,
  noMainMenu: {
    name: "Geen menu",
    control: {
      type: "boolean",
    },
  },
  useDropDownMenu: {
    name: "Compacte header",
    options: ["always", "auto"],
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
  showHelp: {
    name: "Show help link or button",
    control: {
      type: "boolean",
    },
  },
  helpUrl: {
    name: "Help url",
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
  userHomeActive: noControl,
  userProfileUrl: noControl,
  userProfileName: {
    name: "Naam gebruiker",
    control: {
      type: "text",
    },
  },
  dsoHeaderClick: argTypeAction(),
};

export function headerArgsMapper(a: HeaderArgs): Required<Header> {
  return {
    ...a,
    mainMenu: a.noMainMenu ? [] : a.mainMenu,
    dsoHeaderClick: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoHeaderClick(event.detail);
    },
  };
}
