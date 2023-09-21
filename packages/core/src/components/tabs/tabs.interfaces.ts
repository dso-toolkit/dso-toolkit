export interface Tab {
  label: string;
  id: string;
  active?: boolean;
  disabled?: boolean;
}

export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  selected: string;
}
