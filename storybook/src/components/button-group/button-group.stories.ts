import readme from "@dso-toolkit/core/src/components/button-group/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { ButtonGroupArgs, buttonGroupArgTypes, buttonGroupArgs, buttonGroupArgsMapper } from "./button-group.args.js";
import { buttonGroupTemplate } from "./button-group.template.js";

type ButtonGroupStory = StoryObj<ButtonGroupArgs>;

const meta: Meta<ButtonGroupArgs> = {
  title: "Core/Button Group",
  argTypes: buttonGroupArgTypes,
  args: buttonGroupArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: ButtonGroupStory = {
  render: (args) => buttonGroupTemplate(buttonGroupArgsMapper(args)),
};
