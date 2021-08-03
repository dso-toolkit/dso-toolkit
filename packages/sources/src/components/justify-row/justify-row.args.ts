import { ArgTypes } from '../../stories-helpers';

import { JustifyRow } from './justify-row.models';

export interface JustifyRowArgs {
  label: string;
}

export const justifyRowArgTypes: ArgTypes<JustifyRowArgs> = {
  label: {
    control: {
      type: 'text'
    }
  }
};

export function justifyRowArgsMapper(a: JustifyRowArgs): JustifyRow {
  return {
    label: a.label
  };
}
