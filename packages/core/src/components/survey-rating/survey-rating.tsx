import { Component, ComponentInterface, Event, EventEmitter, Fragment, h } from "@stencil/core";
import { SurveyRatingCloseEvent, SurveyRatingSubmitEvent } from "./survey-rating.interfaces";

@Component({
  tag: "dso-survey-rating",
  styleUrl: "survey-rating.scss",
  shadow: true,
})
export class SurveyRating implements ComponentInterface {
  private rating: number | undefined;

  /**
   * Emitted when the user submits the Survey Rating.
   */
  @Event()
  dsoSubmit!: EventEmitter<SurveyRatingSubmitEvent>;

  /**
   * Emitted when the user wants to close the  Survey Rating.
   */
  @Event()
  dsoClose!: EventEmitter<SurveyRatingCloseEvent>;

  private handleForm(e: Event): void {
    e.preventDefault();
    this.dsoSubmit.emit({ rating: this.rating, scale: { start: 1, end: 7 }, originalEvent: e });
  }

  private handleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.rating = Number(target.value);
  }

  render() {
    const ratings = [
      "Heel moeilijk",
      "Moeilijk",
      "Redelijk moeilijk",
      "Neutraal",
      "Redelijk makkelijk",
      "Makkelijk",
      "Heel makkelijk",
    ];

    return (
      <dso-panel
        emphasized
        onDsoCloseClick={(e) => this.dsoClose.emit({ originalEvent: e })}
        role="dialog"
        aria-labelledby="panel-heading"
      >
        <h2 id="panel-heading" slot="heading">
          Help ons met een onderzoek
        </h2>
        <strong>Hoe moeilijk of makkelijk was deze taak om uit te voeren?</strong>
        <form onSubmit={(e) => this.handleForm(e)}>
          <div class="visual-rating-labels" aria-hidden="true">
            <span>Heel moeilijk</span>
            <span>Heel makkelijk</span>
          </div>
          <div role="radiogroup">
            {ratings.map((rating, index) => {
              const ratingNumber = index + 1;

              return (
                <>
                  <label class={`survey-rating-${ratingNumber}`}>
                    {ratingNumber}
                    <span class="sr-only">{rating}</span>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingNumber}
                      checked={ratingNumber === this.rating}
                      onChange={(e) => this.handleChange(e)}
                    />
                  </label>
                </>
              );
            })}
          </div>
          <button type="submit" class="dso-secondary">
            <span>Antwoord verzenden</span>
          </button>
        </form>
      </dso-panel>
    );
  }
}
