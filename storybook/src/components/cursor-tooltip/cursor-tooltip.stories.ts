import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  CursorTooltipArgs,
  cursorTooltipArgTypes,
  cursorTooltipArgs,
  cursorTooltipArgsMapper,
} from "./cursor-tooltip.args.js";
import { cursorTooltipTemplate } from "./cursor-tooltip.template.js";

type CursorTooltipStory = StoryObj<CursorTooltipArgs>;

const meta: Meta<CursorTooltipArgs> = {
  title: "Core/Cursor Tooltip",
  tags: ["!autodocs"],
  argTypes: cursorTooltipArgTypes,
  args: cursorTooltipArgs,
};

export default meta;

export const Default: CursorTooltipStory = {
  render: (args) => cursorTooltipTemplate(cursorTooltipArgsMapper(args)),
  parameters: {
    layout: "centered",
  },
};
