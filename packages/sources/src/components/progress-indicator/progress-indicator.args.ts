import { ArgTypes } from '../../stories-helpers';

import { ProgressIndicator } from './progress-indicator.models';

export interface ProgressIndicatorArgs {
  status?: string;
  size?: string;
  block?: boolean;
  color?: string;
}

export const progressIndicatorArgTypes: ArgTypes<ProgressIndicatorArgs> = {
  status: {
    control: {
      type: 'text'
    }
  },
  size: {
    control: {
      type: 'text'
    }
  },
  block: {
    control: {
      type: 'boolean'
    }
  },
  color: {
    control: {
      type: 'text'
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
