import { html } from "lit-html";

import { SurveyRating } from "./survey-rating.models.js";

export function surveyRatingTemplate({ dsoSubmit, dsoClose }: SurveyRating) {
  return html`<dso-survey-rating @dsoSubmit=${dsoSubmit} @dsoClose=${dsoClose}></dso-survey-rating>`;
}
