import { ArgTypes } from '../../storybook';
import { HandlerFunction } from '@storybook/addon-actions';
import { InfoButton } from './info-button.models';

export interface InfoButtonArgs {
  active: boolean;
  secondary: boolean;
  label: string;
  dsoToggle: HandlerFunction;
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
  dsoToggle: {
    action: 'dsoToggle'
  }
};

export function infoButtonArgsMapper(a: InfoButtonArgs): Required<InfoButton> {
  return { ...a };
}
