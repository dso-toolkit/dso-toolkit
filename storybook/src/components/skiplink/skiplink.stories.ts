import { Meta, StoryObj } from "@storybook/web-components-vite";

import { SkiplinkArgs, skiplinkArgTypes, skiplinkArgs, skiplinkArgsMapper } from "./skiplink.args.js";
import { skiplinkTemplate } from "./skiplink.template.js";

type SkiplinkStory = StoryObj<SkiplinkArgs>;

const meta: Meta<SkiplinkArgs> = {
  title: "Core/Skiplink",
  tags: ["!autodocs"],
  argTypes: skiplinkArgTypes,
  args: skiplinkArgs,

  render: (args) => skiplinkTemplate(skiplinkArgsMapper(args)),
};

export default meta;

export const Default: SkiplinkStory = {};
