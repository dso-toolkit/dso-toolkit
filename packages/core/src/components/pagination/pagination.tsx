import {
  h,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { ResponsiveElementSize } from "../responsive-element/responsive-element.interfaces";
import { PaginationSelectPageEvent } from "./pagination.interfaces";

@Component({
  tag: "dso-pagination",
  styleUrl: "pagination.scss",
  shadow: true,
})
export class Pagination implements ComponentInterface {
  private sizePositionsMap: Record<ResponsiveElementSize, number> = {
    small: 7,
    medium: 9,
    large: 11,
  };

  private responsiveElement?: HTMLDsoResponsiveElementElement;

  @Element()
  host!: HTMLDsoPaginationElement;

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
  formatHref: (page: number) => string = (page) => "#" + page;

  /**
   * Emitted on page select
   */
  @Event()
  dsoSelectPage!: EventEmitter<PaginationSelectPageEvent>;

  /**
   * Listens to the dsoSizeChange event on Responsive Element
   */
  @Listen("dsoSizeChange")
  sizeChangeHandler(event: CustomEvent<ResponsiveElementSize>) {
    this.availablePositions = this.getAvailablePositions(this.sizePositionsMap[event.detail]);
  }

  private clickHandler(e: MouseEvent, page: number) {
    this.dsoSelectPage.emit({
      originalEvent: e,
      page,
      isModifiedEvent: isModifiedEvent(e),
    });
  }

  componentDidLoad(): void {
    this.responsiveElement
      ?.getSize()
      .then(
        (size: ResponsiveElementSize) =>
          (this.availablePositions = this.getAvailablePositions(this.sizePositionsMap[size])),
      );
  }

  render() {
    if (this.availablePositions === undefined) {
      return <dso-responsive-element ref={(element) => (this.responsiveElement = element)}></dso-responsive-element>;
    }

    const availablePositions = this.availablePositions;

    const currentPage = this.currentPage ?? 0;

    const pages: number[] = this.getPages(currentPage, this.availablePositions, this.totalPages);

    return (
      <dso-responsive-element ref={(element) => (this.responsiveElement = element)}>
        <nav class="pagination" aria-label="Paginering">
          <ul>
            <li class={currentPage <= 1 ? "dso-page-hidden" : undefined}>
              <a
                href={this.formatHref(currentPage - 1)}
                aria-label="Vorige"
                onClick={(e) => currentPage && this.clickHandler(e, currentPage - 1)}
              >
                <dso-icon icon="chevron-left"></dso-icon>
              </a>
            </li>
            {pages.map((page) => (
              <>
                {this.showEllipsisBeforeLast(pages, page, availablePositions) && (
                  <li>
                    <span>...</span>
                  </li>
                )}

                <li key={page} class={currentPage === page ? "active" : undefined}>
                  {currentPage === page ? (
                    <span aria-current="page">{page}</span>
                  ) : (
                    <a href={this.formatHref(page)} onClick={(e) => this.clickHandler(e, page)}>
                      {page}
                    </a>
                  )}
                  {page === this.totalPages ? <span class="sr-only"> (laatste pagina)</span> : null}
                </li>

                {this.showEllipsisAfterFirst(pages, page, availablePositions) && (
                  <li>
                    <span>...</span>
                  </li>
                )}

                {this.showEllipsisLastWithoutTotal(pages, page, this.totalPages) && (
                  <li>
                    <span>...</span>
                  </li>
                )}
              </>
            ))}
            <li class={this.totalPages && currentPage >= this.totalPages ? "dso-page-hidden" : undefined}>
              <a
                href={this.formatHref(currentPage + 1)}
                aria-label="Volgende"
                onClick={(e) => currentPage && this.clickHandler(e, currentPage + 1)}
              >
                <dso-icon icon="chevron-right"></dso-icon>
              </a>
            </li>
          </ul>
        </nav>
      </dso-responsive-element>
    );
  }

  private getAvailablePositions(sizePositions: number) {
    if (sizePositions % 2 === 0) {
      // Even aantal posities zorgt voor een scheve pagination
      return sizePositions - 1;
    }
    if (sizePositions <= 3) {
      // Voor het kunnen tonen van de vorige knop, volgende knop en 1 pagina zijn minimaal 3 posities nodig.
      return 3;
    }

    return sizePositions;
  }

  private getPages(currentPage: number, availablePositions: number, totalPages?: number): number[] {
    if (totalPages) {
      if (totalPages + 2 <= availablePositions) {
        // + 2 voor de vorige en volgende knop
        return Array.from({ length: totalPages }, (_value, i) => i + 1);
      }

      if (availablePositions === 3) {
        return [currentPage];
      }

      if (availablePositions === 5) {
        return [1, currentPage, totalPages];
      }

      return [1, ...this.getPageRange(currentPage, availablePositions, totalPages), totalPages];
    }
    return this.getPageRangeWithoutTotalPages(currentPage, availablePositions);
  }

  private getPageRange(currentPage: number, availablePositions: number, totalPages: number): number[] {
    const range: number[] = [];

    const positionRange = Math.floor(availablePositions / 2);

    if (currentPage <= positionRange) {
      for (let i = 2; i <= availablePositions - 4; i++) {
        range.push(i);
      }
    }

    if (currentPage >= positionRange && currentPage <= totalPages - positionRange) {
      if (positionRange === 1) {
        if (currentPage > totalPages - 2) {
          range.push(totalPages - 2);
        }

        range.push(currentPage);

        if (currentPage < 3) {
          range.push(3);
        }
      }

      if (positionRange > 1) {
        const pagesBeforeOrAfter = positionRange - 3;

        for (
          let i = Math.min(currentPage - pagesBeforeOrAfter, totalPages - positionRange);
          i <= Math.max(currentPage + pagesBeforeOrAfter, positionRange);
          i++
        ) {
          if (i > 2 && i < totalPages - 1) {
            range.push(i);
          }
        }
      }
    }

    if (currentPage > totalPages - positionRange) {
      for (let i = totalPages - (availablePositions - 5); i <= totalPages - 1; i++) {
        range.push(i);
      }
    }

    return range.filter((v, i, a) => a.indexOf(v) === i);
  }

  private showEllipsisAfterFirst(pages: number[], page: number, availablePositions: number): boolean {
    const totalPages = pages[pages.length - 1];

    if (!totalPages) {
      throw new Error("No totalPages");
    }

    const isFirstPage = pages.indexOf(page) === 0;
    const hasManyPages = totalPages > availablePositions - (this.totalPages ? 2 : 6);
    const isPageTwoMissing = !pages.includes(2);
    const hasEnoughPositions = availablePositions >= 7;

    return isFirstPage && hasManyPages && isPageTwoMissing && hasEnoughPositions;
  }

  private showEllipsisBeforeLast(pages: number[], page: number, availablePositions: number): boolean {
    const totalPages = pages[pages.length - 1];

    if (!totalPages) {
      throw new Error("No totalPages");
    }

    const isLastPage = pages.indexOf(page) === pages.length - 1;
    const hasManyPages = totalPages > availablePositions - (this.totalPages ? 2 : 6);
    const isSecondLastPageMissing = !pages.includes(totalPages - 1);
    const hasEnoughPositions = availablePositions >= 7;

    return isLastPage && hasManyPages && isSecondLastPageMissing && hasEnoughPositions;
  }

  private showEllipsisLastWithoutTotal(pages: number[], page: number, totalPages?: number) {
    return totalPages ? false : pages.at(-1) === page;
  }

  private getPageRangeWithoutTotalPages(currentPage: number, availablePositions: number): number[] {
    const positionRange = availablePositions >= 9 ? 2 : 0;
    const start = Math.max(1, currentPage - positionRange);

    // Creates an array of numbers from `start` to `currentPage + 1`
    const result = Array.from({ length: currentPage - start + 2 }, (_, i) => start + i);

    // Adds 1 to the start of the result array if `start` is >= 2
    if (start >= 2) result.unshift(1);

    return result;
  }
}
