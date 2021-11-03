export interface Autosuggest {
  suggestions: AutosuggestSuggestion[];
  suggestOnFocus: boolean;
  onChange: (value: CustomEvent<string>) => void;
  onSelect: (suggestion: CustomEvent<AutosuggestSuggestion>) => void;
}

export interface AutosuggestSuggestion {
  value: string;
  type?: string;
}
