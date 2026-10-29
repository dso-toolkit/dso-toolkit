import { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";

import { SurveyRatingArgs, surveyRatingArgTypes, surveyRatingArgsMapper } from "./survey-rating.args.js";
import { surveyRatingTemplate } from "./survey-rating.template.js";

type SurveyRatingStory = StoryObj<SurveyRatingArgs>;

const meta: Meta<SurveyRatingArgs> = {
  title: "Core/Survey Rating",
  tags: ["!autodocs"],
  argTypes: surveyRatingArgTypes,
  args: {
    dsoSubmit: fn(),
    dsoClose: fn(),
  },

  render: (args) => surveyRatingTemplate(surveyRatingArgsMapper(args)),
};

export default meta;

export const Default: SurveyRatingStory = {};
