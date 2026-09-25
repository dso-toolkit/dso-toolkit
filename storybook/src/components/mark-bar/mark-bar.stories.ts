import readme from "@dso-toolkit/core/src/components/mark-bar/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { MarkBarArgs, markBarArgTypes, markBarArgs, markBarArgsMapper } from "./mark-bar.args.js";
import { markBarTemplate } from "./mark-bar.template.js";

type MarkBarStory = StoryObj<MarkBarArgs>;

const meta: Meta<MarkBarArgs> = {
  title: "Core/Mark Bar",
  args: markBarArgs,
  argTypes: markBarArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => markBarTemplate(markBarArgsMapper(args)),
};

export default meta;

export const Default: MarkBarStory = {};
