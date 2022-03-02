import { ArgTypes } from '../../stories-helpers';

import { Pagination } from './pagination.models';

export interface PaginationArgs {
  count: number;
  current: number;
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
  }
};

export function paginationArgsMapper(a: PaginationArgs): Pagination {
  return {
    count: a.count,
    current: a.current
  };
}
