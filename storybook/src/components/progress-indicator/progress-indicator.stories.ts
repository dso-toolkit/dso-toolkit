import readme from "@dso-toolkit/core/src/components/progress-indicator/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import {
  ProgressIndicatorArgs,
  progressIndicatorArgTypes,
  progressIndicatorArgsMapper,
} from "./progress-indicator.args.js";
import { progressIndicatorTemplate } from "./progress-indicator.template.js";

type ProgressIndicatorStory = StoryObj<ProgressIndicatorArgs>;

const meta: Meta<ProgressIndicatorArgs> = {
  title: "Core/Progress Indicator",
  argTypes: progressIndicatorArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
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
