import { Meta, StoryObj } from "@storybook/web-components-vite";

import { MarkBarArgs, markBarArgTypes, markBarArgs, markBarArgsMapper } from "./mark-bar.args.js";
import { markBarTemplate } from "./mark-bar.template.js";

type MarkBarStory = StoryObj<MarkBarArgs>;

const meta: Meta<MarkBarArgs> = {
  title: "Core/Mark Bar",
  tags: ["!autodocs"],
  args: markBarArgs,
  argTypes: markBarArgTypes,

  render: (args) => markBarTemplate(markBarArgsMapper(args)),
};

export default meta;

export const Default: MarkBarStory = {};
