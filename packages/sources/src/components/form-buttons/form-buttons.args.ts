import { ArgTypes } from '../../stories-helpers';

import { Button } from '../button/button.models';

import { FormButtons } from './form-buttons.models';

export interface FormButtonsArgs {
  buttons: Button[];
  asideButtons: Button[];
}

export const formButtonsArgTypes: ArgTypes<FormButtonsArgs> = {
  buttons: {
    control: {
      disable: true
    }
  },
  asideButtons: {
    control: {
      disable: true
    }
  }
};

export function formButtonsArgsMapper(a: FormButtonsArgs): FormButtons {
  return {
    buttons: a.buttons,
    asideButtons: a.asideButtons
  };
}
