import { Card } from "../card/card.models";

export interface CardList {
  modifiers: string;
  interactionsLocation: string;
  cards: Card[];
}
