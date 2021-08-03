import { Card } from "../card/card.models";

export interface Cards<TemplateFnReturnType> {
  modifiers: string;
  interactionsLocation: string;
  cards: Card<TemplateFnReturnType>[];
}
