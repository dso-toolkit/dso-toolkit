import readme from "@dso-toolkit/core/src/components/info/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { InfoArgs, infoArgTypes, infoArgsMapper } from "./info.args.js";
import { richContent } from "./info.content.js";
import { infoTemplate } from "./info.template.js";

type InfoStory = StoryObj<InfoArgs>;

const meta: Meta<InfoArgs> = {
  title: "Core/Info",
  argTypes: infoArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => infoTemplate(infoArgsMapper(args, richContent())),
};

export default meta;

export const Default: InfoStory = {
  args: {
    active: true,
    dsoClose: fn(),
  },
};

export const Fixed: InfoStory = {
  args: {
    fixed: true,
  },
};
