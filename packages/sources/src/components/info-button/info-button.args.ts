import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { InfoButton } from './info-button.models';

export interface InfoButtonArgs {
  active?: boolean;
  secondary?: boolean;
  label: string;
  onDsoToggle: HandlerFunction;
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
  onDsoToggle: {
    action: 'onDsoToggle'
  }
};

export function infoButtonArgsMapper(a: InfoButtonArgs): InfoButton {
  return {
    onToggle: e => a.onDsoToggle(e),
    active: a.active,
    secondary: a.secondary,
    label: a.label
  };
}
