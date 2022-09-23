import { h, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State } from '@stencil/core';

import { PaginationSelectPageEvent } from './pagination.interfaces';

export type LabelSizeMap = { [key in string]: number; }

@Component({
  tag: 'dso-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination implements ComponentInterface {
  private sizePositionsMap: LabelSizeMap = {
    small: 4,
    medium: 8,
    large: 10,
  }

  private resizeObserver?: ResizeObserver;

  @Element()
  host!: HTMLElement;

  @State()
  elementPositions!: number
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

  componentDidLoad(): void {
    const responsiveElement = this.host.shadowRoot?.querySelector('dso-responsive-element');
    responsiveElement?.getSize().then((size: string) => this.elementPositions = this.sizePositionsMap[size]);

    this.resizeObserver = new ResizeObserver(() => responsiveElement?.getSize().then((size: string) => this.elementPositions = this.sizePositionsMap[size]));

    this.resizeObserver.observe(this.host);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    if (!this.totalPages) {
      return null;
    }

    const currentPage = this.currentPage ?? 0;
    const pages = Array.from({ length: this.totalPages }, (_value, i) => i + 1);
    const currentPageOutOfBounds = currentPage < pages[0] || currentPage > pages[pages.length - 1];

    const pageRange = this.getPageRange(pages, currentPage, this.totalPages, this.elementPositions);

    return (
      <dso-responsive-element class="dso-pagination">
        <ul class="pagination">
          <li class={(currentPage <= pages[0] || currentPageOutOfBounds) ? 'dso-page-hidden' : undefined}>
            <a href={this.formatHref(pages[0])} aria-label="Vorige" onClick={e => currentPage && this.clickHandler(e, pages[currentPage - 2])}>
              <dso-icon icon="chevron-left"></dso-icon>
            </a>
          </li>
          {(pageRange).map(page => (
            <>
              {(pages.indexOf(page) === pages.length - 1 && pages.length > (this.elementPositions - 2)) &&
                <>
                { (
                    (pages.indexOf(currentPage) === 0 && this.elementPositions === 6) ||
                    (currentPage < pages[pages.length - 1] - 2 && this.elementPositions === 8) ||
                    (currentPage < pages[pages.length - 1] - 4 && this.elementPositions === 10)
                  ) &&
                  <li>
                    <span>...</span>
                  </li>
                }
                </>
              }

              <li key={page} class={currentPage === page ? 'active' : undefined}>
                {currentPage === page
                  ? (
                    <span aria-current="page">{page}</span>
                  )
                  : (
                    <a href={this.formatHref(page)} onClick={e => this.clickHandler(e, page)}>{page}</a>
                  )}
              </li>

              {(pages.indexOf(page) === 0 && pages.length > (this.elementPositions - 2)) &&
                <>
                  { (
                      (pages.indexOf(currentPage) === pages.length - 1 && this.elementPositions === 6) ||
                      (currentPage > pages[0] + 2 && this.elementPositions === 8) ||
                      (currentPage > pages[0] + 4 && this.elementPositions === 10)
                    )  &&
                    <li>
                      <span>...</span>
                    </li>
                  }
                </>
              }
            </>
          ))}
          <li class={(currentPage >= pages[pages.length - 1] || currentPageOutOfBounds) ? 'dso-page-hidden' : undefined}>
            <a href={this.formatHref(pages[pages.length - 1])} aria-label="Volgende" onClick={e => currentPage && this.clickHandler(e, pages[currentPage])}>
              <dso-icon icon="chevron-right"></dso-icon>
            </a>
          </li>
        </ul>
      </dso-responsive-element>
    );
  }

  private getPageRange(pages: number[], currentPage: number, totalPages: number, elementPositions: number) {
    return pages.length <= (elementPositions - 2) ? pages : pages.reduce<number[]>((prev, page) => {
      switch (elementPositions) {
        case 4:
          if (page === currentPage) {
            prev.push(page);
          }
          break;
        case 8:
          if (
            page === pages[0] ||
            page === totalPages ||
            page === currentPage ||
            (currentPage <= pages[0] + 2 && page <= pages[0] + 2) ||
            (currentPage >= pages.length - 2 && page >= pages.length - 2)
            ) {
              prev.push(page);
            }
          break;
        case 10:
          if (
            page === pages[0] ||
            page === totalPages ||
            page === currentPage ||
            (currentPage > pages[0] + 4 && page === currentPage + 1) ||
            (currentPage < pages.length - 4 && page === currentPage - 1) ||
            (currentPage <= pages[0] + 4 && page <= pages[0] + 4) ||
            (currentPage >= pages.length - 4 && page >= pages.length - 4)
            ) {
              prev.push(page);
            }
          break;
        default:
          break;
      }

      return prev;
    }, [])

  }
}
