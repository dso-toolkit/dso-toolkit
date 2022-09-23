import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../storybook';

import { Pagination } from './pagination.models';

export interface PaginationArgs {
  totalPages: number;
  currentPage: number;
  dsoSelectPage: HandlerFunction;
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
  dsoSelectPage: {
    action: 'dsoSelectPage'
  }
};

export function paginationArgsMapper(a: PaginationArgs): Pagination {
  return {
    totalPages: a.totalPages,
    currentPage: a.currentPage,
    onSelectPage: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoSelectPage(event);
    },
    formatHref: page => '#' + page,
  };
}
