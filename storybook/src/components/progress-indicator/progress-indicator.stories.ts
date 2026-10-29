import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  ProgressIndicatorArgs,
  progressIndicatorArgTypes,
  progressIndicatorArgsMapper,
} from "./progress-indicator.args.js";
import { progressIndicatorTemplate } from "./progress-indicator.template.js";

type ProgressIndicatorStory = StoryObj<ProgressIndicatorArgs>;

const meta: Meta<ProgressIndicatorArgs> = {
  title: "Core/Progress Indicator",
  tags: ["!autodocs"],
  argTypes: progressIndicatorArgTypes,

  render: (args) => progressIndicatorTemplate(progressIndicatorArgsMapper(args)),
};

export default meta;

export const Small: ProgressIndicatorStory = {
  args: {
    size: "small",
  },
};

export const Medium: ProgressIndicatorStory = {
  args: {
    size: "medium",
  },
};

export const Large: ProgressIndicatorStory = {
  args: {
    size: "large",
  },
};
