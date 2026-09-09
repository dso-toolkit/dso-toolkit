import readme from "@dso-toolkit/core/src/components/label/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { LabelArgs, labelArgTypes, labelArgsMapper } from "./label.args.js";
import { decorator } from "./label.decorator";
import { css } from "./label.demo";
import { labelTemplate } from "./label.template.js";

type LabelStory = StoryObj<LabelArgs, Renderer>;

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
};

export default meta;

const render = (args: LabelArgs) => labelTemplate(labelArgsMapper(args));

export const Default: LabelStory = {
  args: {
    label: "Label",
  },
  render,
};

export const WithAction: LabelStory = {
  args: {
    label: "Label",
    removable: true,
  },
  render,
};

export const Truncate: LabelStory = {
  args: {
    label: "Een hele lange label die je eigenlijk visueel wil afbreken.",
    truncate: true,
  },
  render,
};

export const WithSymbolImage: LabelStory = {
  args: {
    label: "Label",
    status: "bright",
    symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>',
  },
  decorators: [(story) => decorator(story, css)],
  render,
};

export const WithSymbolColor: LabelStory = {
  args: {
    label: "Label",
    status: "bright",
    symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>',
  },
  decorators: [(story) => decorator(story, css)],
  render,
};
