import readme from "@dso-toolkit/core/src/components/skiplink/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { SkiplinkArgs, skiplinkArgTypes, skiplinkArgs, skiplinkArgsMapper } from "./skiplink.args.js";
import { skiplinkTemplate } from "./skiplink.template.js";

type SkiplinkStory = StoryObj<SkiplinkArgs>;

const meta: Meta<SkiplinkArgs> = {
  title: "Core/Skiplink",
  argTypes: skiplinkArgTypes,
  args: skiplinkArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => skiplinkTemplate(skiplinkArgsMapper(args)),
};

export default meta;

export const Default: SkiplinkStory = {};
