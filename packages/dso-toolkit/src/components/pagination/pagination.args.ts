import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { Pagination } from "./pagination.models.js";

export interface PaginationArgs {
  totalPages?: number;
  currentPage: number;
  dsoSelectPage: HandlerFunction;
}

export const paginationArgTypes: ArgTypes<PaginationArgs> = {
  totalPages: {
    control: {
      type: "number",
      min: 1,
    },
  },
  currentPage: {
    control: {
      type: "number",
      min: 1,
    },
  },
  dsoSelectPage: {
    ...noControl,
  },
};

export function paginationArgsMapper(a: PaginationArgs): Pagination {
  const totalPages = a.totalPages ? Math.max(a.totalPages, 1) : undefined;
  const currentPage = totalPages ? Math.min(Math.max(a.currentPage, 1), totalPages) : a.currentPage;

  return {
    ...a,
    totalPages,
    currentPage,
    dsoSelectPage: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoSelectPage(event);
    },
    formatHref: (page) => "#" + page,
  };
}
