import readme from "@dso-toolkit/core/src/components/advanced-select/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  AdvancedSelectArgs,
  advancedSelectArgTypes,
  advancedSelectArgs,
  advancedSelectArgsMapper,
} from "./advanced-select.args.js";
import { advancedSelectTemplate } from "./advanced-select.template.js";

type AdvancedSelectStory = StoryObj<AdvancedSelectArgs, Renderer>;

const meta: Meta<AdvancedSelectArgs> = {
  title: "Core/Advanced Select",
  argTypes: advancedSelectArgTypes,
  args: advancedSelectArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: AdvancedSelectStory = {
  render: (args) => advancedSelectTemplate(advancedSelectArgsMapper(args)),
};
