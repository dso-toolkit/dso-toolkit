export interface SearchBar {
  label?: string;
  id: string;
  icon?: boolean;
  hiddenLabel?: boolean;
  invalid?: boolean;
  placeholder?: string;
  value?: string;
  buttonLabel: string;
  hideSearchButton?: boolean;
  resultsMessage?: string;
  resultsHidden?: boolean;
  ariaDescribedBy?: string;
  ariaErrorMessage?: string;
  clearButton?: boolean;
}
