export interface SurveyRatingSubmitEvent {
  /** The selected rating. One-based. */
  rating: number | undefined;
  scale: SurveyRatingScale;
  originalEvent?: Event;
}

export interface SurveyRatingCloseEvent {
  originalEvent: Event;
}
export interface SurveyRatingScale {
  /** The start of the scale. One-based */
  start: number;
  /** The end of the scale, including the end. One-based. */
  end: number;
}
