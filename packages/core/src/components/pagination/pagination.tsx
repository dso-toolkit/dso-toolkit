import { h, Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State, Listen } from '@stencil/core';

import { PaginationSelectPageEvent } from './pagination.interfaces';

@Component({
  tag: 'dso-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination implements ComponentInterface {
  private sizePositionsMap: Record<string, number> = {
    small: 4,
    medium: 8,
    large: 10,
  };

  @Element()
  host!: HTMLElement;

  @State()
  availablePositions?: number;
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

  /**
   * Listens to the dsoSizeChange event on Responsive Element
   */
  @Listen('dsoSizeChange')
  sizeChangeHandler(event: CustomEvent<string>) {
    this.availablePositions = this.sizePositionsMap[event.detail];
  }

  responsiveElement?: HTMLDsoResponsiveElementElement;

  clickHandler(e: MouseEvent, page: number) {
    this.dsoSelectPage.emit({
      originalEvent: e,
      page,
      isModifiedEvent: e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey,
    });
  };

  componentDidLoad(): void {
    this.responsiveElement?.getSize().then((size: string) => this.availablePositions = this.sizePositionsMap[size]);
  }

  render() {
    if (!this.totalPages) {
      return null;
    }

    const currentPage = this.currentPage ?? 0;
    const pages = Array.from({ length: this.totalPages }, (_value, i) => i + 1);
    const currentPageOutOfBounds = currentPage < pages[0] || currentPage > pages[pages.length - 1];

    const pageRange = this.getPageRange(pages, currentPage, this.totalPages, this.availablePositions ?? pages.length);

    return (
      <dso-responsive-element ref={element => this.responsiveElement = element}>
        <ul class="pagination">
          <li class={(currentPage <= pages[0] || currentPageOutOfBounds) ? 'dso-page-hidden' : undefined}>
            <a href={this.formatHref(pages[0])} aria-label="Vorige" onClick={e => currentPage && this.clickHandler(e, pages[currentPage - 2])}>
              <dso-icon icon="chevron-left"></dso-icon>
            </a>
          </li>
          {(pageRange).map(page => (
            <>
              {(
                this.availablePositions &&
                pages.indexOf(page) === pages.length - 1 &&
                pages.length > (this.availablePositions - 2) &&
                this.showEllipsisBeforeLast(pages, currentPage)
              ) &&
                <li>
                  <span>...</span>
                </li>
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

              {(
                this.availablePositions &&
                pages.indexOf(page) === 0 &&
                pages.length > (this.availablePositions - 2) &&
                this.showEllipsisAfterFirst(pages, currentPage)
              ) &&
                <li>
                  <span>...</span>
                </li>
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
    if (pages.length <= (elementPositions - 2)) {
      return pages;
    }

    return pages.reduce<number[]>((prev, page) => {
      switch (elementPositions) {
        case this.sizePositionsMap['small']:
          if (page === currentPage) {
            prev.push(page);
          }
          break;
        case this.sizePositionsMap['medium']:
          const mediumFirstOrLastRange = this.sizePositionsMap['medium'] - 6;

          if (
            page === pages[0] ||
            page === totalPages ||
            page === currentPage ||
            (currentPage <= pages[0] + mediumFirstOrLastRange && page <= pages[0] + mediumFirstOrLastRange) ||
            (currentPage >= pages.length - mediumFirstOrLastRange && page >= pages.length - mediumFirstOrLastRange)
          ) {
            prev.push(page);
          }
          break;
        case this.sizePositionsMap['large']:
          const largeFirstOrLastRange = this.sizePositionsMap['large'] - 6;

          if (
            page === pages[0] ||
            page === totalPages ||
            page === currentPage ||
            (currentPage > pages[0] + largeFirstOrLastRange && page === currentPage + 1) ||
            (currentPage < pages.length - largeFirstOrLastRange && page === currentPage - 1) ||
            (currentPage <= pages[0] + largeFirstOrLastRange && page <= pages[0] + largeFirstOrLastRange) ||
            (currentPage >= pages.length - largeFirstOrLastRange && page >= pages.length - largeFirstOrLastRange)
          ) {
            prev.push(page);
          }
          break;
        default:
          break;
      }

      return prev;
    }, []);
  }

  private showEllipsisAfterFirst(pages: number[], currentPage: number): boolean {
    if (this.availablePositions === this.sizePositionsMap['small']) {
      return false;
    }

    return (
      this.availablePositions === this.sizePositionsMap['medium'] ||
      this.availablePositions === this.sizePositionsMap['large']
    ) &&
      currentPage > pages[0] + (this.availablePositions - 6);
  }

  private showEllipsisBeforeLast(pages: number[], currentPage: number): boolean {
    if (this.availablePositions === this.sizePositionsMap['small']) {
      return false;
    }

    return (
      this.availablePositions === this.sizePositionsMap['medium'] ||
      this.availablePositions === this.sizePositionsMap['large']
    ) &&
      currentPage < pages[pages.length - 1] - (this.availablePositions - 6);
  }
}
