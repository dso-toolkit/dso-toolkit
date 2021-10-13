import { ArgTypes } from '../../stories-helpers';

import { Card } from '../card/card.models';

import { CardList } from './card-list.models';

export interface CardListArgs {
  cards: Card[];
}

export const cardListArgTypes: ArgTypes<CardListArgs> = {
  cards: {
    control: {
      disable: true
    }
  }
};

export function cardListArgsMapper(a: CardListArgs): CardList {
  return {
    cards: a.cards
  };
}
