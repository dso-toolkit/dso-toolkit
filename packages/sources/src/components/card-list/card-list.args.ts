import { ArgTypes } from '../../stories-helpers';
import { Card } from '../card/card.models';
import { CardList } from './card-list.models';

export interface CardListArgs {
  modifiers: string,
  interactionsLocation: string,
  cards: Card[];
}

export const cardListArgTypes: ArgTypes<CardListArgs> = {
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

export function cardListArgsMapper(a: CardListArgs): CardList {
  return {
    modifiers: a.modifiers,
    interactionsLocation: a.interactionsLocation,
    cards: a.cards
  };
}
