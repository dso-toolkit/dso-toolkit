import { h, Component, ComponentInterface, Prop, Event, EventEmitter } from "@stencil/core";
import { MarkBarInputEvent, MarkBarClearEvent, MarkBarPaginationEvent } from "./mark-bar.interfaces";

@Component({
  tag: "dso-mark-bar",
  styleUrl: "./mark-bar.scss",
  shadow: true,
})
export class MarkBar implements ComponentInterface {
  /**
   * The current search value.
   */
  @Prop()
  value?: string;

  /**
   * The label for the input field.
   */
  @Prop()
  label = "Zoeken in document";

  /**
   * The current (one-based) highlighted search item.
   */
  @Prop()
  current?: number;

  /**
   * Total number of search results.
   */
  @Prop()
  totalCount?: number;

  /**
   * Emitted each time the user types in the search field.
   */
  @Event({ bubbles: false })
  dsoInput!: EventEmitter<MarkBarInputEvent>;

  /**
   * Emitted when user activates "next search result" button.
   */
  @Event({ bubbles: false })
  dsoNext!: EventEmitter<MarkBarPaginationEvent>;

  /**
   * Emitted when user activates "previous search result" button.
   */
  @Event({ bubbles: false })
  dsoPrevious!: EventEmitter<MarkBarPaginationEvent>;

  /**
   * Emitted when user activates "clear search result" button.
   */
  @Event({ bubbles: false })
  dsoClear!: EventEmitter<MarkBarClearEvent>;

  private handleInput = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.dsoInput.emit({
      originalEvent: e,
      value: e.target.value,
    });
  };

  private handleNext = (e: MouseEvent) => {
    this.dsoNext.emit({ originalEvent: e });
  };

  private handlePrevious = (e: MouseEvent) => {
    this.dsoPrevious.emit({ originalEvent: e });
  };

  private handleClear = (e: MouseEvent) => {
    this.dsoClear.emit({ originalEvent: e });
  };

  render() {
    const current = this.current || 0;
    const totalCount = this.totalCount || 0;

    return (
      <div class="dso-mark-bar">
        <div class="dso-mark-bar-input">
          <label htmlFor="search-input">
            <dso-icon class="dso-search-icon" icon="search"></dso-icon>
            <span class="sr-only">{this.label}</span>
          </label>
          <input type="text" id="search-input" value={this.value} onInput={this.handleInput} />
          <button type="button" onClick={this.handleClear}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">Zoekopdracht legen</span>
          </button>
        </div>
        <div class="dso-button-container">
          <span class="divider" />
          <button type="button" onClick={this.handlePrevious} disabled={current <= 1}>
            <dso-icon icon="chevron-up" class="hydrated"></dso-icon>
            <span class="sr-only">Vorig zoekresultaat</span>
          </button>
          <span>
            {current}/{totalCount}
          </span>
          <button type="button" onClick={this.handleNext} disabled={current >= totalCount}>
            <dso-icon icon="chevron-down" class="hydrated"></dso-icon>
            <span class="sr-only">Volgend zoekresultaat</span>
          </button>
        </div>
      </div>
    );
  }
}
