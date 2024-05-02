export interface SlideToggle {
  dsoActiveChange?: (e: CustomEvent<SlideToggleChangeEvent>) => void;
  checked: boolean;
  disabled?: boolean;
  accessibleLabel?: string;
  labelledbyId?: string;
  label?: string;
  useOwnLabelId?: string;
}

export interface SlideToggleChangeEvent {
  originalEvent?: Event;
  checked: boolean;
}

export function isSlideToggleInterface(object: unknown): object is SlideToggle {
  return "checked" in (object as SlideToggle);
}
