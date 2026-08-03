import readme from "@dso-toolkit/core/src/components/cursor-tooltip/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  CursorTooltipArgs,
  cursorTooltipArgTypes,
  cursorTooltipArgs,
  cursorTooltipArgsMapper,
} from "./cursor-tooltip.args.js";
import { cursorTooltipTemplate } from "./cursor-tooltip.template.js";

type CursorTooltipStory = StoryObj<CursorTooltipArgs, Renderer>;

const meta: Meta<CursorTooltipArgs> = {
  title: "Core/Cursor Tooltip",
  argTypes: cursorTooltipArgTypes,
  args: cursorTooltipArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: CursorTooltipStory = {
  render: (args: CursorTooltipArgs) => cursorTooltipTemplate(cursorTooltipArgsMapper(args)),
  parameters: {
    layout: "centered",
  },
};
