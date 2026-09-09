import readme from "@dso-toolkit/core/src/components/survey-rating/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { SurveyRatingArgs, surveyRatingArgTypes, surveyRatingArgsMapper } from "./survey-rating.args.js";
import { surveyRatingTemplate } from "./survey-rating.template.js";

type SurveyRatingStory = StoryObj<SurveyRatingArgs, Renderer>;

const meta: Meta<SurveyRatingArgs> = {
  title: "Core/Survey Rating",
  argTypes: surveyRatingArgTypes,
  args: {
    dsoSubmit: fn(),
    dsoClose: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: SurveyRatingArgs) => surveyRatingTemplate(surveyRatingArgsMapper(args));

export const Default: SurveyRatingStory = {
  render,
};
