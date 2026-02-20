export interface SegmentedButtonOption {
  label: string;
  disabled?: boolean;
}

export interface SegmentedButtonChangeEvent {
  originalEvent: Event;
  option: number;
}
