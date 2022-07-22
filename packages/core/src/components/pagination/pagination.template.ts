import { Pagination } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function paginationTemplate(
  {
    totalPages,
    currentPage,
    onSelectPage,
    formatHref,
  }: Pagination
) {
  return html`
    <dso-pagination
      total-pages=${totalPages}
      current-page=${currentPage}
      .formatHref=${formatHref}
      @selectPage=${onSelectPage}
    ></dso-pagination>
  `;
}
