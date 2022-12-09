import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "../../storybook/index.js";

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
  return {
    ...a,
    dsoSelectPage: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoSelectPage(event);
    },
    formatHref: (page) => "#" + page,
  };
}
