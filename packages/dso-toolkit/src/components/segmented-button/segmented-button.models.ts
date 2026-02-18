export interface SegmentedButtonChangeEvent {
  option: number;
}
export interface SegmentedButton {
  options: SegmentedButtonOption[];
  activeOption: number;
  dsoChange?: (e: CustomEvent<SegmentedButtonChangeEvent>) => void;
}

export interface SegmentedButtonOption {
  label: string;
  disabled?: boolean;
}
