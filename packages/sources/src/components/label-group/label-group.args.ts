import { ArgTypes } from '../../storybook';

import { Label } from '../label/label.models';
import { LabelGroup } from './label-group.models';

export interface LabelGroupArgs {
  labels: Label[];
}

export const labelGroupArgTypes: ArgTypes<LabelGroupArgs> = {
  labels: {
    control: {
      disable: true
    }
  }
};

export function labelGroupArgsMapper(a: LabelGroupArgs): LabelGroup {
  return {
    labels: a.labels
  };
}
