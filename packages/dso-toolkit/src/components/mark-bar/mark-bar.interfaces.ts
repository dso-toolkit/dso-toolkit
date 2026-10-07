export interface MarkBarInputEvent {
  originalEvent: Event;
  value: string;
}

export interface MarkBarPaginationEvent {
  originalEvent: MouseEvent | KeyboardEvent;
}

export interface MarkBarClearEvent {
  originalEvent: MouseEvent;
}

/**
 * Mark Bar focus options
 */
export interface MarkBarFocusOptions {
  /**
   * Set to true to select all text in the input field when it receives focus.
   */
  select?: boolean;
}
