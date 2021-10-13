import { ArgTypes } from '../../stories-helpers';
import { HandlerFunction } from '@storybook/addon-actions';
import { InfoButton } from './info-button.models';

export interface InfoButtonArgs {
  active?: boolean;
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
  click: {
    action: 'toggled'
  }
};

export function infoButtonArgsMapper(a: InfoButtonArgs): InfoButton {
  return {
    onClick: e => a.click(e),
    active: a.active,
    label: a.label
  };
}
