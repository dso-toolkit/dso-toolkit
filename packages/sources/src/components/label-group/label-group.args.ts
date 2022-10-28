import { ArgTypes } from '../../storybook';

import { activeFilters } from './label-group.content';
import { LabelGroup } from './label-group.models';

export interface LabelGroupArgs {
}

export const labelGroupArgTypes: ArgTypes<LabelGroupArgs> = {
  labels: {
    control: {
      disable: true
    }
  }
};

export function labelGroupArgsMapper(): LabelGroup {
  return {
    labels: activeFilters
  };
}
