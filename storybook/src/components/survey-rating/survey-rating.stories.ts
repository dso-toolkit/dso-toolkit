import readme from "@dso-toolkit/core/src/components/survey-rating/readme.md?raw";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { SurveyRatingArgs, surveyRatingArgTypes, surveyRatingArgsMapper } from "./survey-rating.args.js";
import { surveyRatingTemplate } from "./survey-rating.template.js";

type SurveyRatingStory = StoryObj<SurveyRatingArgs>;

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
  render: (args) => surveyRatingTemplate(surveyRatingArgsMapper(args)),
};

export default meta;

export const Default: SurveyRatingStory = {};
