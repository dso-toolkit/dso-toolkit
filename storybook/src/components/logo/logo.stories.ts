import readme from "@dso-toolkit/core/src/components/logo/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { LogoArgs, logoArgTypes, logoArgsMapper } from "./logo.args.js";
import { logoTemplate } from "./logo.template.js";

type LogoStory = StoryObj<LogoArgs>;

const meta: Meta<LogoArgs> = {
  title: "Core/Logo",
  argTypes: logoArgTypes,
  args: {
    dsoLabelClick: fn(),
    dsoLogoClick: fn(),
  },
  render: (args) => logoTemplate(logoArgsMapper(args)),
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: LogoStory = {};
export const WithName: LogoStory = {
  args: {
    name: "Environment & Planning| Portal",
  },
};
export const WithLabel: LogoStory = {
  args: {
    label: "Regels op de kaart",
  },
};
export const WithLabelAndLabelUrl: LogoStory = {
  args: {
    label: "Regels op de kaart",
    labelUrl: "regels-op-de-kaart",
  },
};
export const WithLogoUrl: LogoStory = {
  args: {
    logoUrl: "/",
  },
};
export const WithLogoUrlAndLabelAndLabelUrl: LogoStory = {
  args: {
    label: "Regels op de kaart",
    labelUrl: "regels-op-de-kaart",
    logoUrl: "/",
  },
};
export const WithRibbon: LogoStory = {
  args: {
    ribbon: "beta",
  },
};
export const WithLabelAndRibbon: LogoStory = {
  args: {
    ribbon: "beta",
    label: "Regels op de kaart",
  },
};
