export type AutosuggestMarkItem = { mark: string } | string;

export interface Autosuggest<TemplateFnReturnType> {
  suggestions: AutosuggestSuggestion[] | AutosuggestSuggestionGroup[] | null;
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel?: string;
  loadingDelayed?: number;
  notFoundLabel?: string;
  dsoChange: (value: CustomEvent<string>) => void;
  dsoSelect: (suggestion: CustomEvent<AutosuggestSuggestion>) => void;
  dsoSearch: (value: CustomEvent<string>) => void;
  children: TemplateFnReturnType;
  mark?: (
    suggestion: AutosuggestSuggestion,
    text: string,
    type: "value" | "type" | "extra",
    extraIndex?: number,
  ) => AutosuggestMarkItem[];
}

export interface AutosuggestSuggestion {
  extras?: string[];
  value: string;
  type?: string;
  item?: unknown;
}

export interface AutosuggestSuggestionGroup {
  groupLabel: string;
  suggestions: AutosuggestSuggestion[];
}
