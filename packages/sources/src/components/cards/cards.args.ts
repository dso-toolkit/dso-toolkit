import { ArgTypes } from '../../stories-helpers';
import { Card } from '../card/card.models';
import { Cards } from './cards.models';

export interface CardsArgs<TemplateFnReturnType> {
  modifiers: string,
  interactionsLocation: string,
  cards: Card<TemplateFnReturnType>[];
}

export const cardsArgTypes: ArgTypes<CardsArgs<unknown>> = {
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

export function cardsArgsMapper(a: CardsArgs<any>): Cards<any> {
  return {
    modifiers: a.modifiers,
    interactionsLocation: a.interactionsLocation,
    cards: a.cards
  };
}
