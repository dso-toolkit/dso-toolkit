import readme from "@dso-toolkit/core/src/components/progress-indicator/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  ProgressIndicatorArgs,
  progressIndicatorArgTypes,
  progressIndicatorArgsMapper,
} from "./progress-indicator.args.js";
import { progressIndicatorTemplate } from "./progress-indicator.template.js";

type ProgressIndicatorStory = StoryObj<ProgressIndicatorArgs, Renderer>;

const meta: Meta<ProgressIndicatorArgs> = {
  title: "Core/Progress Indicator",
  argTypes: progressIndicatorArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: ProgressIndicatorArgs) => progressIndicatorTemplate(progressIndicatorArgsMapper(args));

export const Small: ProgressIndicatorStory = {
  args: {
    size: "small",
  },
  render,
};

export const Medium: ProgressIndicatorStory = {
  args: {
    size: "medium",
  },
  render,
};

export const Large: ProgressIndicatorStory = {
  args: {
    size: "large",
  },
  render,
};
