// Keep in sync with readme.md
export interface Suggestion {
  /**
   * The text that will be displayed as the suggestion.
   */
  value: string;

  /**
   * The type of suggestion.
   */
  type?: string;

  /**
   * A reference to the original object that was used to create the suggestion.
   */
  item?: unknown;
}
