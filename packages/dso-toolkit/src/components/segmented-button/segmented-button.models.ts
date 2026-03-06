export interface SegmentedButtonChangeEvent {
  originalEvent: Event;
  option: number;
}
export interface SegmentedButton {
  options: SegmentedButtonOption[];
  activeOption?: number;
  dsoChange?: (event: CustomEvent<SegmentedButtonChangeEvent>) => void;
  segmentedAriaRequired?: boolean;
  segmentedAriaLabel?: string;
}

export interface SegmentedButtonOption {
  label: string;
  disabled?: boolean;
}
