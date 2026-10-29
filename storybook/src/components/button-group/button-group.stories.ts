import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ButtonGroupArgs, buttonGroupArgTypes, buttonGroupArgs, buttonGroupArgsMapper } from "./button-group.args.js";
import { buttonGroupTemplate } from "./button-group.template.js";

type ButtonGroupStory = StoryObj<ButtonGroupArgs>;

const meta: Meta<ButtonGroupArgs> = {
  title: "Core/Button Group",
  tags: ["!autodocs"],
  argTypes: buttonGroupArgTypes,
  args: buttonGroupArgs,
};

export default meta;

export const Default: ButtonGroupStory = {
  render: (args) => buttonGroupTemplate(buttonGroupArgsMapper(args)),
};
