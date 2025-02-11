import { SurveyRating } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreSurveyRating: ComponentImplementation<SurveyRating> = {
  component: "surveyRating",
  implementation: "core",
  template: () =>
    function surveyRatingTemplate({ dsoSubmit, dsoClose }) {
      return html`<dso-survey-rating @dsoSubmit=${dsoSubmit} @dsoClose=${dsoClose}></dso-survey-rating>`;
    },
};
