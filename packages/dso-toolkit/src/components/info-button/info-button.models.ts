export interface InfoButton {
  active?: boolean;
  secondary?: boolean;
  label?: string;
  dsoToggle?: (e: CustomEvent<InfoButtonToggleEvent>) => void;
}

export interface InfoButtonToggleEvent {
  originalEvent?: MouseEvent;
}
