import { ArgTypes } from '../../stories-helpers';

import { Button } from '../button/button.models';

import { Card } from './card.models';

export interface CardArgs {
  label: string;
  content: string;
  interactions: Button[];
}

export const cardArgTypes: ArgTypes<Card> = {
  label: {
    control: {
      type: 'string'
    }
  },
  content: {
    control: {
      type: 'text',
      required: true
    }
  },
  interactions: {
    control: {
      disable: true
    }
  }
};

export function cardArgsMapper(a: CardArgs): Card {
  return {
    label: a.label,
    content: a.content,
    interactions: a.interactions
  };
}
