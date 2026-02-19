export type InfoButtonTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface InfoButton<TemplateFnReturnType> {
  active?: boolean;
  toggletipPlacement?: InfoButtonTooltipPlacement;
  secondary?: boolean;
  label?: string;
  dsoToggle?: (e: CustomEvent<InfoButtonToggleEvent>) => void;
  children?: TemplateFnReturnType;
}

export interface InfoButtonToggleEvent {
  originalEvent?: MouseEvent;
}
