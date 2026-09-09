import readme from "@dso-toolkit/core/src/components/input-range/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { InputRangeArgs, inputRangeArgTypes, inputRangeArgs, inputRangeArgsMapper } from "./input-range.args.js";
import { inputRangeTemplate } from "./input-range.template.js";

type InputRangeStory = StoryObj<InputRangeArgs, Renderer>;

const meta: Meta<InputRangeArgs> = {
  title: "Core/Input Range",
  argTypes: inputRangeArgTypes,
  args: inputRangeArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: InputRangeStory = {
  args: {},
  render: (args) => inputRangeTemplate(inputRangeArgsMapper(args)),
};
