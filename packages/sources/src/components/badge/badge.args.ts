import { ArgTypes } from '../../stories-helpers';

import { Badge } from './badge.models';

export interface BadgeArgs {
  status?: string;
  message: string;
}

export const badgeArgTypes: ArgTypes<BadgeArgs> = {
  status: {
    options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
    control: {
      type: 'select'
    }
  },
  message: {
    control: {
      type: 'text'
    }
  }
};

export function badgeArgsMapper(a: BadgeArgs): Badge {
  return {
    status: a.status,
    message: a.message
  };
}
