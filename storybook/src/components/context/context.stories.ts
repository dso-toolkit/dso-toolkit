import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/context/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { ContextArgs, contextArgTypes, contextArgsMapper } from "./context.args.js";
import { children, content, label } from "./context.content.js";
import { contextTemplate } from "./context.template.js";

type ContextStory = StoryObj<ContextArgs>;

const meta: Meta<ContextArgs> = {
  title: "HTML|CSS/Context",
  argTypes: contextArgTypes,
  args: {
    type: "label",
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => contextTemplate(contextArgsMapper(args, content, children, label)),
};

export default meta;

export const Label: ContextStory = {};

export const LabelAlignLeft: ContextStory = {
  args: {
    alignLeft: true,
  },
};

export const Legend: ContextStory = {
  args: {
    type: "legend",
  },
};

export const LegendAlignLeft: ContextStory = {
  args: {
    type: "legend",
    alignLeft: true,
  },
};
