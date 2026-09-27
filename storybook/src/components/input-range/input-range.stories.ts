import readme from "@dso-toolkit/core/src/components/input-range/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { InputRangeArgs, inputRangeArgTypes, inputRangeArgs, inputRangeArgsMapper } from "./input-range.args.js";
import { inputRangeTemplate } from "./input-range.template.js";

type InputRangeStory = StoryObj<InputRangeArgs>;

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
