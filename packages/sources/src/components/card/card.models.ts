import { Button } from "../button/button.models";

export interface Card {
  label: string;
  content: string;
  interactions?: Button[];
}
