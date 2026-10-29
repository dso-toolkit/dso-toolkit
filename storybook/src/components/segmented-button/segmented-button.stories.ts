import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  SegmentedButtonArgs,
  segmentedButtonArgTypes,
  segmentedButtonArgs,
  segmentedButtonArgsMapper,
} from "./segmented-button.args.js";
import { segmentedButtonTemplate } from "./segmented-button.template.js";

type SegmentedButtonStory = StoryObj<SegmentedButtonArgs>;

const meta: Meta<SegmentedButtonArgs> = {
  title: "Core/Segmented Button",
  tags: ["!autodocs"],
  argTypes: segmentedButtonArgTypes,
  args: {
    ...segmentedButtonArgs,
  },

  render: (args) => segmentedButtonTemplate(segmentedButtonArgsMapper(args)),
};

export default meta;

export const Default: SegmentedButtonStory = {};

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
};
