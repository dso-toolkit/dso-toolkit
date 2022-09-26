export interface Autosuggest {
  suggestions: AutosuggestSuggestion[];
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel?: string;
  loadingDelayed?: number;
  notFoundLabel?: string;
  dsoChange: (value: CustomEvent<string>) => void;
  dsoSelect: (suggestion: CustomEvent<AutosuggestSuggestion>) => void;
  dsoSearch: (value: CustomEvent<string>) => void;
}

export interface AutosuggestSuggestion {
  value: string;
  type?: string;
  item?: unknown;
}
