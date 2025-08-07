import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { SurveyRating } from "./survey-rating.models.js";

export interface SurveyRatingArgs {
  dsoSubmit: HandlerFunction;
  dsoClose: HandlerFunction;
}

export const surveyRatingArgTypes: ArgTypes<SurveyRatingArgs> = {
  dsoSubmit: argTypeAction(),
  dsoClose: argTypeAction(),
};

export function surveyRatingArgsMapper(a: SurveyRatingArgs): SurveyRating {
  return {
    ...a,
    dsoClose: (e) => a.dsoClose(e.detail),
    dsoSubmit: (e) => a.dsoSubmit(e.detail),
  };
}
