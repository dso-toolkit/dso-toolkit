import { Meta, StoryObj } from "@storybook/web-components-vite";

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
  tags: ["!autodocs"],
  argTypes: advancedSelectArgTypes,
  args: advancedSelectArgs,
};

export default meta;

export const Default: AdvancedSelectStory = {
  render: (args) => advancedSelectTemplate(advancedSelectArgsMapper(args)),
};
