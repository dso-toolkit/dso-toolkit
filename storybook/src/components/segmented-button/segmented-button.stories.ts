import readme from "@dso-toolkit/core/src/components/segmented-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  SegmentedButtonArgs,
  segmentedButtonArgTypes,
  segmentedButtonArgs,
  segmentedButtonArgsMapper,
} from "./segmented-button.args.js";
import { segmentedButtonTemplate } from "./segmented-button.template.js";

type SegmentedButtonStory = StoryObj<SegmentedButtonArgs, Renderer>;

const meta: Meta<SegmentedButtonArgs> = {
  title: "Core/Segmented Button",
  argTypes: segmentedButtonArgTypes,
  args: {
    ...segmentedButtonArgs,
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: SegmentedButtonArgs) => segmentedButtonTemplate(segmentedButtonArgsMapper(args));

export const Default: SegmentedButtonStory = {
  render,
};

export const WithDisabledButton: SegmentedButtonStory = {
  args: {
    options: [
      {
        label: "Button 1",
      },
      {
        label: "Button 2",
      },
      {
        label: "Button 3",
        disabled: true,
      },
      {
        label: "Button 4",
        disabled: true,
      },
    ],
  },
  render,
};
