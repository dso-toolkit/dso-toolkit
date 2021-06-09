import { ArgTypes } from '../../stories-helpers';

import { Tooltip, tooltipPositions } from './tooltip.models';

export interface TooltipArgs {
  position: typeof tooltipPositions;
  label?: string;
  id?: string;
}

export const tooltipArgTypes: ArgTypes<TooltipArgs> = {
  position: {
    options: tooltipPositions,
    control: {
      type: 'select'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  id: {
    control: {
      type: 'text'
    }
  }
};

export function tooltipArgsMapper(a: TooltipArgs): Tooltip {
  return {
    label: a.label || `Ik sta "${a.position}"`,
    position: a.position,
    id: a.id
  };
}
