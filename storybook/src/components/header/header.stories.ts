import readme from "@dso-toolkit/core/src/components/header/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { HeaderArgs, headerArgTypes, headerArgsMapper } from "./header.args.js";
import { headerTemplate } from "./header.template.js";

type HeaderStory = StoryObj<HeaderArgs, Renderer>;

const meta: Meta<HeaderArgs> = {
  title: "Core/Header",
  argTypes: headerArgTypes,
  args: {
    mainMenu: [
      {
        label: "Home",
        url: "#home",
        active: true,
      },
      {
        label: "Vergunningscheck",
        url: "#vergunningscheck",
      },
      {
        label: "Aanvragen",
        url: "#aanvragen",
      },
      {
        label: "Regels op de kaart",
        url: "#regelsopdekaart",
      },
      {
        label: "Maatregelen op maat",
        url: "#maatregelenopmaat",
      },
      {
        label: "Hulpcentrum",
        url: "#hulpcentrum",
      },
      {
        label: "Omgevingswet ondersteuning",
        url: "#omgevingswet-ondersteuning",
      },
      {
        label: "Een willekeurig menu item",
        url: "#een-willekeurig-menu-item",
      },
    ],
    noMainMenu: false,
    compact: "auto",
    authStatus: "loggedIn",
    loginUrl: "#login",
    logoutUrl: "#logout",
    userProfileName: "J.A. Jansen",
    userProfileUrl: "#profiel",
    userHomeUrl: "#myhome",
    dsoHeaderClick: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: HeaderArgs) => headerTemplate(headerArgsMapper(args));

export const Default: HeaderStory = { render };

export const WithLabel: HeaderStory = {
  args: {
    label: "Maatregelen op maat",
  },
  render,
};

export const WithLabelAndLabelUrl: HeaderStory = {
  args: {
    label: "Maatregelen op maat",
    labelUrl: "maatregelen-op-maat",
  },
  render,
};

export const WithLogoUrlAndLabelAndLabelUrl: HeaderStory = {
  args: {
    label: "Maatregelen op maat",
    labelUrl: "maatregelen-op-maat",
    logoUrl: "/",
  },
  render,
};

export const WithRibbon: HeaderStory = {
  args: {
    ribbon: "beta",
  },
  render,
};

export const WithLabelAndRibbon: HeaderStory = {
  args: {
    label: "Maatregelen op maat",
    ribbon: "beta",
  },
  render,
};

export const UserHomeActive: HeaderStory = {
  args: {
    mainMenu: [
      {
        label: "Home",
        url: "#home",
      },
      {
        label: "Vergunningscheck",
        url: "#vergunningscheck",
      },
      {
        label: "Aanvragen",
        url: "#aanvragen",
      },
      {
        label: "Regels op de kaart",
        url: "#regelsopdekaart",
      },
      {
        label: "Maatregelen op maat",
        url: "#maatregelenopmaat",
      },
      {
        label: "Hulpcentrum",
        url: "#hulpcentrum",
      },
    ],
    userHomeActive: true,
  },
  render,
};

export const WithLinkToHelp: HeaderStory = {
  args: {
    showHelp: true,
    helpUrl: "#help",
  },
  render,
};

export const WithButtonToHelp: HeaderStory = {
  args: {
    showHelp: true,
  },
  render,
};
