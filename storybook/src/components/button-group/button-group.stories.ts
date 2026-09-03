import readme from "@dso-toolkit/core/src/components/button-group/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { ButtonGroupArgs, buttonGroupArgTypes, buttonGroupArgs, buttonGroupArgsMapper } from "./button-group.args.js";
import { buttonGroupTemplate } from "./button-group.template.js";

type ButtonGroupStory = StoryObj<ButtonGroupArgs, Renderer>;

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
  render: (args: ButtonGroupArgs) => buttonGroupTemplate(buttonGroupArgsMapper(args)),
};
