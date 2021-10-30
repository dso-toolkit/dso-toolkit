export interface Suggestion {
  value: string;
  type?: string;
}

export interface Autosuggest {
  fetchSuggestions: (value: string) => Promise<Array<Suggestion>>;
  onSelected: (value: string) => void;
  suggestOnFocus: boolean;
}
