import { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";

import { TijdreisBannerArgs, tijdreisBannerArgs } from "./tijdreis-banner.args.js";
import { tijdreisBannerTemplate } from "./tijdreis-banner.template.js";

type TijdreisBannerStory = StoryObj<TijdreisBannerArgs>;

const meta: Meta<TijdreisBannerArgs> = {
  title: "Core/Tijdreis Banner",
  tags: ["!autodocs"],
  args: {
    click: fn(),
  },
  argTypes: {
    click: {
      action: "click",
    },
  },

  render: (args) => tijdreisBannerTemplate(tijdreisBannerArgs(args)),
};

export default meta;

export const Default: TijdreisBannerStory = {};
