import { Component, ComponentInterface, Event, EventEmitter, Method, Prop, h } from "@stencil/core";

import {
  MarkBarClearEvent,
  MarkBarFocusOptions,
  MarkBarInputEvent,
  MarkBarPaginationEvent,
} from "./mark-bar.interfaces";

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
   * Focuses the input field.
   */
  @Method()
  async dsoFocus(options: MarkBarFocusOptions = {}) {
    this.inputElement?.focus();

    if (options.select) {
      this.inputElement?.select();
    }
  }

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

  private inputElement?: HTMLInputElement;

  private handleInput = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    this.dsoInput.emit({
      originalEvent: e,
      value: e.target.value,
    });
  };

  private handleNext = (originalEvent: MouseEvent | KeyboardEvent) => {
    this.dsoNext.emit({ originalEvent });
  };

  private handlePrevious = (originalEvent: MouseEvent) => {
    this.dsoPrevious.emit({ originalEvent });
  };

  private handleClear = (originalEvent: MouseEvent) => {
    this.dsoClear.emit({ originalEvent });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this.handleNext(e);
    }
  };

  render() {
    const current = this.current || 0;
    const totalCount = this.totalCount || 0;

    return (
      <div class="dso-mark-bar">
        <div class="dso-mark-bar-input">
          <input
            type="text"
            id="search-input"
            value={this.value}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
            placeholder=" "
            ref={(element) => (this.inputElement = element)}
          />
          <label htmlFor="search-input">
            <dso-icon class="dso-search-icon" icon="search"></dso-icon>
            <span class="label-text">{this.label}</span>
          </label>
          <dso-icon-button
            icon="cross"
            variant="tertiary"
            label="Zoekopdracht legen"
            onDsoClick={(e) => this.handleClear(e.detail.originalEvent)}
          />
        </div>
        <div class="dso-button-container">
          <span class="divider" />
          <dso-icon-button
            icon="chevron-up"
            variant="tertiary"
            label="Vorig zoekresultaat"
            onDsoClick={(e) => this.handlePrevious(e.detail.originalEvent)}
            disabled={current <= 1}
          />
          <span>
            {current}/{totalCount}
          </span>
          <dso-icon-button
            icon="chevron-down"
            variant="tertiary"
            label="Volgend zoekresultaat"
            onDsoClick={(e) => this.handleNext(e.detail.originalEvent)}
            disabled={current >= totalCount}
          />
        </div>
      </div>
    );
  }
}
