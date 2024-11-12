export interface Skiplink {
  /** id of element to scroll to */
  to: string;
  label: string;
  dsoSkiplinkClick?: (e: CustomEvent<SkiplinkClickEvent>) => void;
}

export interface SkiplinkClickEvent {
  originalEvent: MouseEvent;
  isModifiedEvent: boolean;
}
