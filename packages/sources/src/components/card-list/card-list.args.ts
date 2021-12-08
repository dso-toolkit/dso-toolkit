import { ArgTypes } from '../../stories-helpers';

import { Card } from '../card/card.models';

import { CardList } from './card-list.models';

export interface CardListArgs<TemplateFnReturnType> {
  cards: Card<TemplateFnReturnType>[];
}

export const cardListArgTypes: ArgTypes<CardListArgs<never>> = {
  cards: {
    control: {
      disable: true
    }
  }
};

export function cardListArgsMapper(a: CardListArgs<never>): CardList<never> {
  return {
    cards: a.cards
  };
}
