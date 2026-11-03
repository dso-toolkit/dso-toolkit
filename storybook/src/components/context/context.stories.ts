import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ContextArgs, contextArgTypes, contextArgsMapper } from "./context.args.js";
import { children, content, label } from "./context.content.js";
import { contextTemplate } from "./context.template.js";

type ContextStory = StoryObj<ContextArgs>;

const meta: Meta<ContextArgs> = {
  title: "HTML|CSS/Context",
  tags: ["!autodocs"],
  argTypes: contextArgTypes,
  args: {
    type: "label",
  },

  render: (args) => contextTemplate(contextArgsMapper(args, content(), children(), label())),
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
