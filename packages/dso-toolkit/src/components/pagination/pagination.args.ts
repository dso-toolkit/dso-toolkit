import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { Pagination } from "./pagination.models.js";

export interface PaginationArgs {
  totalPages: number;
  currentPage: number;
  dsoSelectPage: HandlerFunction;
}

export const paginationArgTypes: ArgTypes<PaginationArgs> = {
  totalPages: {
    control: {
      type: "number",
    },
  },
  currentPage: {
    control: {
      type: "number",
    },
  },
  dsoSelectPage: {
    action: "dsoSelectPage",
  },
};

export function paginationArgsMapper(a: PaginationArgs): Required<Pagination> {
  const totalPages = Math.max(a.totalPages, 1);
  const currentPage = Math.min(Math.max(a.currentPage, 1), totalPages);

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
