import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/rich-content/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { RichContentArgs, richContentArgTypes, richContentArgsMapper } from "./rich-content.args.js";
import { children } from "./rich-content.content.js";
import { richContentTemplate } from "./rich-content.template.js";

type RichContentStory = StoryObj<RichContentArgs>;

const meta: Meta<RichContentArgs> = {
  title: "HTML|CSS/Rich Content",
  argTypes: richContentArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const RichContent: RichContentStory = {
  render: (args) => richContentTemplate(richContentArgsMapper(args, children)),
};
