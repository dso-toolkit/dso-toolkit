import readme from "@dso-toolkit/core/src/components/badge/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { BadgeArgs, badgeArgTypes, badgeArgsMapper } from "./badge.args.js";
import { children } from "./badge.content.js";
import { badgeTemplate } from "./badge.template.js";

type BadgeStory = StoryObj<BadgeArgs>;

const meta: Meta<BadgeArgs> = {
  title: "Core/Badge",
  argTypes: badgeArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Plain: BadgeStory = {
  args: {
    message: "Plain",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Primary: BadgeStory = {
  args: {
    status: "primary",
    message: "Primary",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Success: BadgeStory = {
  args: {
    status: "success",
    message: "Success",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Info: BadgeStory = {
  args: {
    status: "info",
    message: "Info",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Warning: BadgeStory = {
  args: {
    status: "warning",
    message: "Warning",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Error: BadgeStory = {
  args: {
    status: "error",
    message: "Error",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Outline: BadgeStory = {
  args: {
    status: "outline",
    message: "Outline",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const Attention: BadgeStory = {
  args: {
    status: "attention",
    message: "Attention",
  },
  render: (args) => badgeTemplate(badgeArgsMapper(args)),
};

export const WithToggletip: BadgeStory = {
  args: {
    status: "primary",
    message: "1",
    toggletip: true,
    label: "Toon toelichting",
    toggletipPlacement: "top",
  },
  parameters: { layout: "centered" },
  render: (args) => badgeTemplate(badgeArgsMapper(args, children())),
};
