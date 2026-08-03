import readme from "@dso-toolkit/core/src/components/logo/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { LogoArgs, logoArgTypes, logoArgsMapper } from "./logo.args.js";
import { logoTemplate } from "./logo.template.js";

type LogoStory = StoryObj<LogoArgs, Renderer>;

const meta: Meta<LogoArgs> = {
  title: "Core/Logo",
  argTypes: logoArgTypes,
  args: {
    dsoLabelClick: fn(),
    dsoLogoClick: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: LogoArgs) => logoTemplate(logoArgsMapper(args));

export const Default: LogoStory = { render };
export const WithName: LogoStory = {
  args: {
    name: "Environment & Planning| Portal",
  },
  render,
};
export const WithLabel: LogoStory = {
  args: {
    label: "Regels op de kaart",
  },
  render,
};
export const WithLabelAndLabelUrl: LogoStory = {
  args: {
    label: "Regels op de kaart",
    labelUrl: "regels-op-de-kaart",
  },
  render,
};
export const WithLogoUrl: LogoStory = {
  args: {
    logoUrl: "/",
  },
  render,
};
export const WithLogoUrlAndLabelAndLabelUrl: LogoStory = {
  args: {
    label: "Regels op de kaart",
    labelUrl: "regels-op-de-kaart",
    logoUrl: "/",
  },
  render,
};
export const WithRibbon: LogoStory = {
  args: {
    ribbon: "beta",
  },
  render,
};
export const WithLabelAndRibbon: LogoStory = {
  args: {
    ribbon: "beta",
    label: "Regels op de kaart",
  },
  render,
};
