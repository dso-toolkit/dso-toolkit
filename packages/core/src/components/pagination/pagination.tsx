import { h, Component, ComponentInterface, Event, EventEmitter, Prop } from '@stencil/core';

import { PaginationSelectPageEvent } from './pagination.interfaces';

@Component({
  tag: 'dso-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination implements ComponentInterface {
  /**
   * Total pages
   */
  @Prop()
  totalPages?: number;

  /**
   * Current page
   */
  @Prop()
  currentPage?: number;

  /**
   * This function is called to format the href
   */
  @Prop()
  formatHref: (page: number) => string = (page) => '#' + page;

  /**
   * Emitted on page select
   */
  @Event()
  dsoSelectPage!: EventEmitter<PaginationSelectPageEvent>;

  clickHandler(e: MouseEvent, page: number) {
    this.dsoSelectPage.emit({
      originalEvent: e,
      page,
      isModifiedEvent: e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey,
    });
  };

  render() {
    if (!this.totalPages) {
      return null;
    }

    const currentPage = this.currentPage ?? 0;
    const pages = Array.from({ length: this.totalPages }, (_value, i) => i + 1);
    const currentPageOutOfBounds = currentPage < pages[0] || currentPage > pages[pages.length - 1];

    return (
      <ul class="pagination">
        <li class={(currentPage <= pages[0] || currentPageOutOfBounds) ? 'dso-page-hidden' : undefined}>
          <a href={this.formatHref(pages[0])} aria-label="Vorige" onClick={e => currentPage && this.clickHandler(e, pages[currentPage - 2])}>
            <dso-icon icon="chevron-left"></dso-icon>
          </a>
        </li>
        {pages.map(page => (
          <li key={page} class={currentPage === page ? 'active' : undefined}>
            {currentPage === page
              ? (
                <span aria-current="page">{page}</span>
              )
              : (
                <a href={this.formatHref(page)} onClick={e => this.clickHandler(e, page)}>{page}</a>
              )}
          </li>
        ))}
        <li class={(currentPage >= pages[pages.length - 1] || currentPageOutOfBounds) ? 'dso-page-hidden' : undefined}>
          <a href={this.formatHref(pages[pages.length - 1])} aria-label="Volgende" onClick={e => currentPage && this.clickHandler(e, pages[currentPage])}>
            <dso-icon icon="chevron-right"></dso-icon>
          </a>
        </li>
      </ul>
    );
  }
}
