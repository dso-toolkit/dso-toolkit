import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../stories-helpers';

import { Pagination } from './pagination.models';

export interface PaginationArgs {
  count: number;
  current: number;
  label: string;
  onSelectPage: HandlerFunction;
}

export const paginationArgTypes: ArgTypes<PaginationArgs> = {
  count: {
    control: {
      type: 'number'
    }
  },
  current: {
    control: {
      type: 'number'
    }
  },
  label: {
    control: {
      type: 'text'
    }
  },
  onSelectPage: {
    action: 'selectPage'
  }
};

export function paginationArgsMapper(a: PaginationArgs): Pagination {
  return {
    count: a.count,
    current: a.current,
    label: a.label,
    onSelectPage: a.onSelectPage,
  };
}
