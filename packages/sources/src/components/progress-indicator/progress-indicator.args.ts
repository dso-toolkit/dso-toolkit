import { ArgTypes } from '../../stories-helpers';

import { ProgressIndicator } from './progress-indicator.models';

export interface ProgressIndicatorArgs {
  status?: string;
  size?: string;
  block?: boolean;
}

export const progressIndicatorArgTypes: ArgTypes<ProgressIndicatorArgs> = {
  status: {
    control: {
      type: 'text'
    }
  },
  size: {
    options: [undefined, 'small', 'medium', 'large'],
    control: {
      type: 'select'
    }
  },
  block: {
    control: {
      type: 'boolean'
    }
  }
};

export function progressIndicatorArgsMapper(a: ProgressIndicatorArgs): ProgressIndicator {
  return {
    status: a.status || undefined,
    size: a.size,
    block: a.block
  };
}
