import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';
import { Button } from './button.models';

export interface ButtonArgs {
  click: HandlerFunction;
  type?: 'button' | 'submit';
  modifier: string;
  label: string;
  id?: string;
  disabled?: boolean;
  icon?: string;
  iconMode?: 'only' | 'after';
}

export const buttonArgTypes: ArgTypes<ButtonArgs> = {
  click: {
    action: 'onClick'
  },
  type: {
    options: ['button', 'submit', undefined],
    control: {
      type: 'select'
    }
  },
  modifier: {
    control: {
      type: 'text'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  id: {
    control: {
      type: 'text'
    }
  },
  disabled: {
    control: {
      type: 'boolean'
    }
  },
  icon: {
    options: [undefined, 'chevron-left', 'chevron-right'],
    control: {
      type: 'select'
    }
  },
  iconMode: {
    options: [undefined, 'only', 'after'],
    control: {
      type: 'select'
    }
  }
}

export function buttonArgsMapper(a: ButtonArgs): Button {
  return {
    onClick: a.click,
    type: a.type,
    modifier: a.modifier,
    label: a.label,
    id: a.id,
    disabled: a.disabled,
    icon: a.icon
      ? {
        icon: a.icon
      }
      : undefined,
    iconMode: a.iconMode
  };
}
