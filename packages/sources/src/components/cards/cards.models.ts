export interface Cards {
  modifiers: string;
  interactionsLocation: string;
  cards: Card[];
}

export interface Card {
  label: string;
  content: string;
}
