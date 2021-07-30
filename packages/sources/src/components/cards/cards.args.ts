import { ArgTypes } from '../../stories-helpers';
import { Card, Cards } from './cards.models';

export interface CardsArgs {
  modifiers: string,
  interactionsLocation: string,
  cards: Card[];
}

export const cardsArgTypes: ArgTypes<Cards> = {
  modifiers: {
    control: {
      type: 'string'
    }
  },
  interactionsLocation: {
    control: {
      type: 'string'
    }
  },
  cards: {
    control: {
      disable: true
    }
  }
};

export function cardsArgsMapper(a: CardsArgs): Cards {
  return {
    modifiers: a.modifiers,
    interactionsLocation: a.interactionsLocation,
    cards: a.cards
  };
}
