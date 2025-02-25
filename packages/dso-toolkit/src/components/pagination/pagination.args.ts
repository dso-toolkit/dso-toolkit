import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

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
    action: "dsoSelectPage",
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
