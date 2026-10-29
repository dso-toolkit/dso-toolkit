import { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";

import { LabelArgs, labelArgTypes, labelArgsMapper } from "./label.args.js";
import { decorator } from "./label.decorator.js";
import { labelTemplate } from "./label.template.js";

type LabelStory = StoryObj<LabelArgs>;

const meta: Meta<LabelArgs> = {
  title: "Core/Label",
  tags: ["!autodocs"],
  argTypes: labelArgTypes,
  args: {
    dsoRemoveClick: fn(),
  },

  render: (args) => labelTemplate(labelArgsMapper(args)),
};

export default meta;

export const Default: LabelStory = {
  args: {
    label: "Label",
  },
};

export const WithAction: LabelStory = {
  args: {
    label: "Label",
    removable: true,
  },
};

export const Truncate: LabelStory = {
  args: {
    label: "Een hele lange label die je eigenlijk visueel wil afbreken.",
    truncate: true,
  },
};

export const WithSymbolImage: LabelStory = {
  args: {
    label: "Label",
    status: "bright",
    symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>',
  },
  decorators: [decorator],
};

export const WithSymbolColor: LabelStory = {
  args: {
    label: "Label",
    status: "bright",
    symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
  },
  decorators: [decorator],
};
