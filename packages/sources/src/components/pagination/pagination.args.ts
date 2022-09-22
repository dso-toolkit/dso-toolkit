import { HandlerFunction } from '@storybook/addon-actions';
import { ArgTypes } from '../../storybook';

import { Pagination } from './pagination.models';

export interface PaginationArgs {
  totalPages: number;
  currentPage: number;
  onDsoSelectPage: HandlerFunction;
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
  onDsoSelectPage: {
    action: 'onDsoSelectPage'
  }
};

export function paginationArgsMapper(a: PaginationArgs): Pagination {
  return {
    totalPages: a.totalPages,
    currentPage: a.currentPage,
    onSelectPage: (event) => {
      event.detail.originalEvent.preventDefault();
      a.onDsoSelectPage(event);
    },
    formatHref: page => '#' + page,
  };
}
