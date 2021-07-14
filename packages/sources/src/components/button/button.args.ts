import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';
import { Button, ButtonAnchor } from './button.models';

export interface ButtonArgs {
  element: 'button' | 'anchor';
  legacy?: boolean;
  variant: 'primary' | 'secondary' | 'tertiary';
  click: HandlerFunction;
  type?: 'button' | 'submit';
  label: string;
  id?: string;
  disabled?: boolean;
  icon?: string;
  iconMode?: 'only' | 'after';
}

export const buttonArgTypes: ArgTypes<ButtonArgs> = {
  element: {
    options: ['button', 'anchor'],
    control: {
      type: 'select'
    }
  },
  legacy: {
    control: {
      type: 'boolean'
    }
  },
  variant: {
    options: ['primary', 'secondary', 'tertiary'],
    control: {
      type: 'select'
    }
  },
  click: {
    action: 'onClick'
  },
  type: {
    options: ['button', 'submit'],
    control: {
      type: 'select'
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

const legacyVariantMap = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-default',
  tertiary: 'btn btn-link'
};

export function buttonArgsMapper(a: ButtonArgs): Button | ButtonAnchor {
  switch(a.element) {
    case 'anchor':
      const args: ButtonAnchor = {
        url: '#',
        label: a.label,
        icon: a.icon
          ? {
            icon: a.icon
          }
          : undefined,
        iconMode: a.iconMode,
        id: a.id,
        modifier: a.legacy ? legacyVariantMap[a.variant] : `dso-${a.variant}`
      };

      return args;
    case 'button':
      return {
        variant: a.legacy ? null : a.variant,
        onClick: a.click,
        type: a.type,
        modifier: a.legacy ? legacyVariantMap[a.variant] : undefined,
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
    default:
      throw new Error('Unknown element type for Button component');
  }
}
