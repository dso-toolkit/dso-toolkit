import { Button } from "../button/button.models";

export interface Card<TemplateFnReturnType> {
  label: string;
  content: TemplateFnReturnType | string;
  interactions: Interaction[];
}

export interface Interaction {
  toggle: InteractionToggle[];
  button: Button[];
}

export interface InteractionToggle {
  id: string;
  label: string;
}
