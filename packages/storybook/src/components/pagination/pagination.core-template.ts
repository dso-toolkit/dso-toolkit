import { Pagination } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from '../../templates';

export const corePagination: ComponentImplementation<Pagination> = {
  component: 'pagination',
  implementation: 'core',
  template: () => function paginationTemplate({
    totalPages,
    currentPage,
    dsoSelectPage,
    formatHref,
  }) {
    return html`
      <dso-pagination
        total-pages=${totalPages}
        current-page=${currentPage}
        .formatHref=${ifDefined(formatHref)}
        @dsoSelectPage=${ifDefined(dsoSelectPage)}
      ></dso-pagination>
    `;
  }
}
