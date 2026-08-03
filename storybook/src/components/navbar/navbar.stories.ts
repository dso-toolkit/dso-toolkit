import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/navbar/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";
import { MarkBarArgs, markBarArgsMapper } from "../mark-bar/mark-bar.args.js";
import { markBarTemplate } from "../mark-bar/mark-bar.template.js";

import { NavbarArgs, navbarArgTypes, navbarArgs, navbarArgsMapper } from "./navbar.args.js";
import { navbarTemplate } from "./navbar.template.js";

type NavbarStory = StoryObj<NavbarArgs, Renderer>;

const meta: Meta<NavbarArgs> = {
  title: "HTML|CSS/Navbar",
  argTypes: navbarArgTypes,
  args: navbarArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: NavbarArgs) => navbarTemplate(navbarArgsMapper(args));
const secondaryArgs: Pick<NavbarArgs, "modifier" | "items"> = {
  modifier: "sub",
  items: [
    {
      label: "Deze locatie",
      active: true,
      href: "#",
    },
    {
      label: "Regels",
      href: "#",
    },
    {
      label: "Overige informatie",
      href: "#",
    },
  ],
};
const extension = markBarTemplate(
  markBarArgsMapper({
    ...(meta.args as MarkBarArgs),
    label: "Zoeken",
    current: 1,
    totalCount: 10,
  }),
);

export const Primary: NavbarStory = {
  args: {
    modifier: "main",
    items: [
      {
        label: "Home",
        active: true,
        href: "#",
      },
      {
        label: "Vergunningcheck",
        href: "#",
      },
      {
        label: "Aanvragen",
        href: "#",
      },
      {
        label: "Regels op de kaart",
        href: "#",
      },
      {
        label: "Mijn Omgevingsloket",
        href: "#",
      },
    ],
  },
  render,
};

export const Secondary: NavbarStory = {
  args: secondaryArgs,
  render,
};

export const WithExtension: NavbarStory = {
  args: {
    ...secondaryArgs,
    extensionOpen: true,
  },
  render: (args) => navbarTemplate(navbarArgsMapper(args, extension)),
};
