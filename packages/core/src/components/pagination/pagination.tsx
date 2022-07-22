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
  selectPage!: EventEmitter<PaginationSelectPageEvent>;

  clickHandler(e: MouseEvent, page: number) {
    if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) {
      return;
    }

    e.preventDefault();

    this.selectPage.emit({ originalEvent: e, page });
  };

  render() {
    if (!this.totalPages) {
      return null;
    }

    const pages = Array.from({ length: this.totalPages }, (_value, i) => i + 1);

    return (
      <ul class="pagination">
        <li class={this.currentPage === pages[0] ? 'dso-page-hidden' : undefined}>
          <a href={this.formatHref(pages[0])} aria-label="Vorige" onClick={e => this.clickHandler(e, pages[0])}>
            <dso-icon icon="chevron-left"></dso-icon>
          </a>
        </li>
        {pages.map(page => (
          <li key={page} class={this.currentPage === page ? 'active' : undefined}>
            {this.currentPage === page
              ? (
                <span aria-current="page">{page}</span>
              )
              : (
                <a href={this.formatHref(page)} onClick={e => this.clickHandler(e, page)}>{page}</a>
              )}
          </li>
        ))}
        <li class={this.currentPage === pages[pages.length - 1] ? 'dso-page-hidden' : undefined}>
          <a href={this.formatHref(pages[pages.length - 1])} aria-label="Volgende" onClick={e => this.clickHandler(e, pages[pages.length - 1])}>
            <dso-icon icon="chevron-right"></dso-icon>
          </a>
        </li>
      </ul>
    );
  }
}
