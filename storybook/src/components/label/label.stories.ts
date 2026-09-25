import readme from "@dso-toolkit/core/src/components/label/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { LabelArgs, labelArgTypes, labelArgsMapper } from "./label.args.js";
import { decorator } from "./label.decorator";
import { css } from "./label.demo";
import { labelTemplate } from "./label.template.js";

type LabelStory = StoryObj<LabelArgs>;

const meta: Meta<LabelArgs> = {
  title: "Core/Label",
  argTypes: labelArgTypes,
  args: {
    dsoRemoveClick: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
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
  decorators: [(story) => decorator(story, css)],
};

export const WithSymbolColor: LabelStory = {
  args: {
    label: "Label",
    status: "bright",
    symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
  },
  decorators: [(story) => decorator(story, css)],
};
