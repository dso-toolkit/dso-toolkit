import { Card } from "../card/card.models";

export interface Cards {
  modifiers: string;
  interactionsLocation: string;
  cards: Card[];
}
