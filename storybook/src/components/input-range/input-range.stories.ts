import { Meta, StoryObj } from "@storybook/web-components-vite";

import { InputRangeArgs, inputRangeArgTypes, inputRangeArgs, inputRangeArgsMapper } from "./input-range.args.js";
import { inputRangeTemplate } from "./input-range.template.js";

type InputRangeStory = StoryObj<InputRangeArgs>;

const meta: Meta<InputRangeArgs> = {
  title: "Core/Input Range",
  tags: ["!autodocs"],
  argTypes: inputRangeArgTypes,
  args: inputRangeArgs,
};

export default meta;

export const Default: InputRangeStory = {
  args: {},
  render: (args) => inputRangeTemplate(inputRangeArgsMapper(args)),
};
