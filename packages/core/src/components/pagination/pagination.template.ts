import { Pagination } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function paginationTemplate(
  {
    count,
    current,
    label,
    onSelectPage,
  }: Pagination
) {
  return html`
    <dso-pagination
      count=${count}
      current=${current}
      label=${label}
      .createLink=${(page: number) => '#' + page}
      @selectPage=${onSelectPage}
    ></dso-pagination>
  `;
}
