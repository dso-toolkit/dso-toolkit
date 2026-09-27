import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Pagination } from "./pagination.models.js";

export function paginationTemplate({ totalPages, currentPage, dsoSelectPage, formatHref }: Pagination) {
  return html`
    <dso-pagination
      total-pages=${ifDefined(totalPages)}
      current-page=${currentPage}
      .formatHref=${ifDefined(formatHref)}
      @dsoSelectPage=${ifDefined(dsoSelectPage)}
    ></dso-pagination>
  `;
}
