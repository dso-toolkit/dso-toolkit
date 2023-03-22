export interface Expandable<TemplateFnReturnType> {
  open?: boolean;
  enableAnimation?: boolean;
  animationOffset?: number;
  content: TemplateFnReturnType;
  dsoToggle?: (e: CustomEvent<ExpandableToggleEvent>) => void;
}

export interface ExpandableToggleEvent {
  originalEvent?: MouseEvent | KeyboardEvent;
  open: boolean;
}
