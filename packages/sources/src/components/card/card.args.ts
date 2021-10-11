import { ArgTypes } from '../../stories-helpers';
import { Card, Interaction } from './card.models';

export interface CardArgs<TemplateFnReturnType> {
  label: string;
  content: TemplateFnReturnType | string;
  interactions: Interaction[];
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

export function cardArgsMapper(a: CardArgs<any>): Card {
  return {
    label: a.label,
    content: a.content,
    interactions: a.interactions
  };
}
