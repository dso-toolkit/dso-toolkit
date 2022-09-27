import { ArgTypes } from '../../storybook';

import { Button } from '../button/button.models';

import { Card } from './card.models';

export interface CardArgs {
  label: string;
  selectable: boolean;
  content: string;
  interactions: Button[];
  image: string;
}

export const cardArgTypes: ArgTypes<Card<never>> = {
  label: {
    control: {
      type: 'string'
    }
  },
  selectable: {
    control: {
      type: 'boolean'
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
  },
  image: {
    control: {
      type: 'text'
    }
  },
};

export function cardArgsMapper(a: CardArgs): Card<never> {
  return {
    label: a.label,
    selectable: a.selectable
      ? {
        id: '1',
        label: 'Selecteer',
        dsoChange: () => undefined,
        type: 'checkbox',
        value: '1'
      }
      : undefined,
    content: a.content,
    interactions: a.interactions,
    image: a.image,
  };
}
