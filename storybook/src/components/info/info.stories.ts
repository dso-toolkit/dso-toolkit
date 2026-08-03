import readme from "@dso-toolkit/core/src/components/info/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { InfoArgs, infoArgTypes, infoArgsMapper } from "./info.args.js";
import { richContent } from "./info.content.js";
import { infoTemplate } from "./info.template.js";

type InfoStory = StoryObj<InfoArgs, Renderer>;

const meta: Meta<InfoArgs> = {
  title: "Core/Info",
  argTypes: infoArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: InfoArgs) => infoTemplate(infoArgsMapper(args, richContent));

export const Default: InfoStory = {
  args: {
    active: true,
    dsoClose: fn(),
  },
  render,
};

export const Fixed: InfoStory = {
  args: {
    fixed: true,
  },
  render,
};
