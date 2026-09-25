import readme from "@dso-toolkit/core/src/components/tijdreis-banner/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { TijdreisBannerArgs, tijdreisBannerArgs } from "./tijdreis-banner.args.js";
import { tijdreisBannerTemplate } from "./tijdreis-banner.template.js";

type TijdreisBannerStory = StoryObj<TijdreisBannerArgs>;

const meta: Meta<TijdreisBannerArgs> = {
  title: "Core/Tijdreis Banner",
  args: {
    click: fn(),
  },
  argTypes: {
    click: {
      action: "click",
    },
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => tijdreisBannerTemplate(tijdreisBannerArgs(args)),
};

export default meta;

export const Default: TijdreisBannerStory = {};
