import { ArgTypes } from '../../stories-helpers';
import { content } from './content/form.content';

import { Form } from './form.models';

export interface FormArgs {
  legend?: string;
  mode: 'horizontal' | 'vertical' | undefined;
}

export const formArgTypes: ArgTypes<FormArgs> = {
  legend: {
    defaultValue: 'Formulier',
    control: {
      type: 'text'
    }
  },
  mode: {
    options: [undefined, 'horizontal', 'vertical'],
    control: {
      type: 'select'
    }
  }
};

export function formArgsMapper(a: FormArgs): Form<any> {
  return {
    legend: a.legend,
    mode: a.mode,
    formGroups: content
  };
}
