import readme from "@dso-toolkit/core/src/components/tijdreis-banner/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { TijdreisBannerArgs, tijdreisBannerArgs } from "./tijdreis-banner.args.js";
import { tijdreisBannerTemplate } from "./tijdreis-banner.template.js";

type TijdreisBannerStory = StoryObj<TijdreisBannerArgs, Renderer>;

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
};

export default meta;

const render = (args: TijdreisBannerArgs) => tijdreisBannerTemplate(tijdreisBannerArgs(args));

export const Default: TijdreisBannerStory = {
  render,
};
