export interface Autosuggest {
  suggestions: AutosuggestSuggestion[] | null;
  suggestOnFocus: boolean;
  loading: boolean;
  loadingLabel?: string;
  loadingDelayed?: number;
  notFoundLabel?: string;
  onChange: (value: CustomEvent<string>) => void;
  onSelect: (suggestion: CustomEvent<AutosuggestSuggestion>) => void;
  onSearch: (value: CustomEvent<string>) => void;
}

export interface AutosuggestSuggestion {
  value: string;
  type?: string;
  item?: unknown;
}
