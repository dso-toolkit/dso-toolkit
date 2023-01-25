export interface SlideToggle {
  dsoActiveChange: (e: CustomEvent<SlideToggleChangeEvent>) => void;
  checked?: boolean;
  disabled?: boolean;
}

export interface SlideToggleChangeEvent {
  originalEvent?: Event;
  checked: boolean;
}
