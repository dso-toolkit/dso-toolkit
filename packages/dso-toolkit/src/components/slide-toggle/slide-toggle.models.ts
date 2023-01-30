export interface SlideToggle {
  dsoActiveChange: (e: CustomEvent<SlideToggleChangeEvent>) => void;
  checked?: boolean;
  disabled?: boolean;
  identifier: string;
  arialabelledbyid: string;
}

export interface SlideToggleChangeEvent {
  originalEvent?: Event;
  checked: boolean;
}
