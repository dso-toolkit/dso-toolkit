export interface InfoButton<TemplateFnReturnType> {
  active?: boolean;
  secondary?: boolean;
  label?: string;
  dsoToggle?: (e: CustomEvent<InfoButtonToggleEvent>) => void;
  children?: TemplateFnReturnType;
}

export interface InfoButtonToggleEvent {
  originalEvent?: MouseEvent;
}
