import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { InfoButton } from './info-button.models';

export interface InfoButtonArgs {
  active?: boolean;
  secondary?: boolean;
  label: string;
  click: HandlerFunction;
}

export const infoButtonArgTypes: ArgTypes<InfoButtonArgs> = {
  label: {
    control: {
      type: 'text'
    }
  },
  active: {
    control: {
      type: 'boolean'
    }
  },
  secondary: {
    control: {
      type: 'boolean'
    }
  },
  click: {
    action: 'toggled'
  }
};

export function infoButtonArgsMapper(a: InfoButtonArgs): InfoButton {
  return {
    onToggle: e => a.click(e),
    active: a.active,
    secondary: a.secondary,
    label: a.label
  };
}
