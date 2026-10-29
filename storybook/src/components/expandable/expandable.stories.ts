import { Meta, StoryObj } from "@storybook/web-components-vite";

import { ExpandableArgs, expandableArgTypes, expandableArgsMapper } from "./expandable.args.js";
import { expandableContent } from "./expandable.content.js";
import { decorator } from "./expandable.decorator.js";
import { expandableTemplate } from "./expandable.template.js";

type ExpandableStory = StoryObj<ExpandableArgs>;

const meta: Meta<ExpandableArgs> = {
  title: "Core/Expandable",
  tags: ["!autodocs"],
  argTypes: expandableArgTypes,
  args: {
    open: false,
  },
  decorators: [decorator],

  render: (args) => expandableTemplate(expandableArgsMapper(args, expandableContent())),
};

export default meta;

export const Default: ExpandableStory = {
  args: {
    enableAnimation: false,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const WithAnimation: ExpandableStory = {
  args: {
    enableAnimation: true,
  },
  parameters: {
    layout: "fullscreen",
  },
};
