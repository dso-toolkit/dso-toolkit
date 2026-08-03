import readme from "@dso-toolkit/core/src/components/skiplink/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { SkiplinkArgs, skiplinkArgTypes, skiplinkArgs, skiplinkArgsMapper } from "./skiplink.args.js";
import { skiplinkTemplate } from "./skiplink.template.js";

type SkiplinkStory = StoryObj<SkiplinkArgs, Renderer>;

const meta: Meta<SkiplinkArgs> = {
  title: "Core/Skiplink",
  argTypes: skiplinkArgTypes,
  args: skiplinkArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: SkiplinkArgs) => skiplinkTemplate(skiplinkArgsMapper(args));

export const Default: SkiplinkStory = {
  render,
};
