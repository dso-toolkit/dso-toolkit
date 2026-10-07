export interface SelectableChangeEvent {
  originalEvent: Event;
  checked: boolean;
  name?: string;
  value?: string;
}
