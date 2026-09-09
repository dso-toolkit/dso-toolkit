export interface SurveyRating {
  dsoSubmit?: (e: CustomEvent<SurveyRatingSubmitEvent>) => void;
  dsoClose?: (e: CustomEvent<SurveyRatingCloseEvent>) => void;
}

interface SurveyRatingSubmitEvent {
  /** The selected rating. One-based. */
  rating: number | undefined;
  scale: SurveyRatingScale;
  originalEvent?: Event;
}

interface SurveyRatingCloseEvent {
  originalEvent: Event;
}

interface SurveyRatingScale {
  /** The start of the scale. One-based */
  start: number;
  /** The end of the scale, including the end. One-based. */
  end: number;
}
