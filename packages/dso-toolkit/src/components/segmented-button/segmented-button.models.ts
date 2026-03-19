export interface SegmentedButtonChangeEvent {
  originalEvent: Event;
  option: SegmentedButtonOption;
}

export interface SegmentedButton {
  options: SegmentedButtonOption[];
  activeOption?: SegmentedButtonOption;
  dsoChange?: (event: CustomEvent<SegmentedButtonChangeEvent>) => void;
  segmentedAriaRequired?: boolean;
  segmentedAriaLabel?: string;
}

export interface SegmentedButtonOption {
  label: string;
  disabled?: boolean;
}
