export interface SegmentedButtonChangeEvent {
  originalEvent: Event;
  option: number;
}
export interface SegmentedButton {
  options: SegmentedButtonOption[];
  activeOption: number;
  dsoChange?: (event: CustomEvent<SegmentedButtonChangeEvent>) => void;
}

export interface SegmentedButtonOption {
  label: string;
  disabled?: boolean;
}
