import { ArgTypes } from '../../stories-helpers';

import { Button } from '../button/button.models';

import { ButtonRow } from './button-row.models';

export interface ButtonRowArgs<TemplateFnReturnType> {
  buttons: Button<TemplateFnReturnType>[];
}

export const buttonRowArgTypes: ArgTypes<ButtonRowArgs<never>> = {
  buttons: {
    control: {
      disable: true
    }
  }
};

export function buttonRowArgsMapper(a: ButtonRowArgs<never>): ButtonRow<never> {
  return {
    buttons: a.buttons
  };
}
