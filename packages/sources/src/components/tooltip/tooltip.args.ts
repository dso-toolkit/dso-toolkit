import { HandlerFunction } from '@storybook/addon-actions';

import { ArgTypes } from '../../stories-helpers';

import { Tooltip, tooltipPositions } from './tooltip.models';

export interface TooltipArgs {
  active?: boolean;
  position: typeof tooltipPositions;
  label?: string;
  id?: string;
  action: HandlerFunction
}

export const tooltipArgTypes: ArgTypes<TooltipArgs> = {
  active: {
    control: {
      type: 'boolean'
    }
  },
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
  },
  action: {
    action: 'Button'
  }
};

export function tooltipArgsMapper(a: TooltipArgs): Tooltip {
  return {
    active: a.active,
    label: a.label || `Ik sta "${a.position}"`,
    position: a.position,
    id: a.id
  };
}
