export type InfoButtonTooltipPlacement = "top" | "bottom" | "left" | "right";

export interface InfoButton<TemplateFnReturnType> {
  active?: boolean;
  toggletipPlacement?: InfoButtonTooltipPlacement;
  label?: string;
  dsoToggle?: (e: CustomEvent<InfoButtonToggleEvent>) => void;
  children?: TemplateFnReturnType;
}

export interface InfoButtonToggleEvent {
  originalEvent?: MouseEvent;
}

export function isInfoButtonInterface<TemplateFnReturnType>(
  object: unknown,
): object is InfoButton<TemplateFnReturnType> {
  return (
    "toggletipPlacement" in (object as InfoButton<TemplateFnReturnType>) &&
    "label" in (object as InfoButton<TemplateFnReturnType>) &&
    "children" in (object as InfoButton<TemplateFnReturnType>)
  );
}
