import { TooltipPlacement } from "@dso-toolkit/core/src";

export interface InfoButton<TemplateFnReturnType> {
  active?: boolean;
  toggletipPlacement?: TooltipPlacement;
  secondary?: boolean;
  label?: string;
  dsoToggle?: (e: CustomEvent<InfoButtonToggleEvent>) => void;
  children?: TemplateFnReturnType;
}

export interface InfoButtonToggleEvent {
  originalEvent?: MouseEvent;
}
