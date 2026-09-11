import readme from "@dso-toolkit/core/src/components/advanced-select/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import {
  AdvancedSelectArgs,
  advancedSelectArgTypes,
  advancedSelectArgs,
  advancedSelectArgsMapper,
} from "./advanced-select.args.js";
import { advancedSelectTemplate } from "./advanced-select.template.js";

type AdvancedSelectStory = StoryObj<AdvancedSelectArgs>;

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
