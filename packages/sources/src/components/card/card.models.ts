import { Button } from "../button/button.models";

export interface Card {
  label: string;
  content: string;
  interactions: Interaction[];
}

export interface Interaction {
  toggle: InteractionToggle;
  button: Button;
}

export interface InteractionToggle {
  id: string;
  label: string;
}
