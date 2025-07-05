import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { SurveyRating } from "./survey-rating.models.js";

export interface SurveyRatingArgs {
  dsoSubmit: HandlerFunction;
  dsoClose: HandlerFunction;
}

export const surveyRatingArgTypes: ArgTypes<SurveyRatingArgs> = {
  dsoSubmit: {
    ...noControl,
    action: "dsoSubmit",
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
  },
};

export function surveyRatingArgsMapper(a: SurveyRatingArgs): SurveyRating {
  return {
    ...a,
  };
}
