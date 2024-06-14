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

  /**
   * An array of additional strings
   */
  extras?: string[];
}

export type AutosuggestMarkItem = { mark: string } | string;

export type AutosuggestMarkFunction = (
  suggestion: Suggestion,
  text: string,
  type: "value" | "type" | "extra",
  extraIndex?: number,
) => AutosuggestMarkItem[];
