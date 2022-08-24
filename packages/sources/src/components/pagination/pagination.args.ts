import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../storybook';

import { Pagination } from './pagination.models';

export interface PaginationArgs {
  totalPages: number;
  currentPage: number;
  onSelectPage: HandlerFunction;
}

export const paginationArgTypes: ArgTypes<PaginationArgs> = {
  totalPages: {
    control: {
      type: 'number'
    }
  },
  currentPage: {
    control: {
      type: 'number'
    }
  },
  onSelectPage: {
    action: 'selectPage'
  }
};

export function paginationArgsMapper(a: PaginationArgs): Pagination {
  return {
    totalPages: a.totalPages,
    currentPage: a.currentPage,
    onSelectPage: (event) => {
      event.detail.originalEvent.preventDefault();
      a.onSelectPage(event);
    },
    formatHref: page => '#' + page,
  };
}
