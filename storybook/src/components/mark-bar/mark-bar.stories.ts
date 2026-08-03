import readme from "@dso-toolkit/core/src/components/mark-bar/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { MarkBarArgs, markBarArgTypes, markBarArgs, markBarArgsMapper } from "./mark-bar.args.js";
import { markBarTemplate } from "./mark-bar.template.js";

type MarkBarStory = StoryObj<MarkBarArgs, Renderer>;

const meta: Meta<MarkBarArgs> = {
  title: "Core/Mark Bar",
  args: markBarArgs,
  argTypes: markBarArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: MarkBarArgs) => markBarTemplate(markBarArgsMapper(args));

export const Default: MarkBarStory = {
  render,
};
