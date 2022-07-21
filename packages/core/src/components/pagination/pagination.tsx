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
  count!: number;

  /**
   * Current page
   */
  @Prop()
  current!: number;

  /**
   * Current page
   */
  @Prop()
  label!: string;

  /**
   * Function is called to construct the href for each anchor element.
   */
  @Prop()
  createLink!: (page: number) => string;

  /**
   * Emitted on page select
   */
  @Event()
  selectPage!: EventEmitter<PaginationSelectPageEvent>;

  clickHandler = (e: MouseEvent, page: number) => {
    e.preventDefault();

    this.selectPage.emit({ originalEvent: e, page });
  };

  render() {
    const pages = Array.from({ length: this.count }, (_value, i) => i + 1);

    return (
      <nav aria-label={this.label}>
        <ul class="pagination">
          <li class={this.current === pages[0] ? 'dso-page-hidden' : undefined}>
            <a href={this.createLink(pages[0])} aria-label="Vorige" onClick={e => this.clickHandler(e, pages[0])}>
              <span class="dso-previous" aria-hidden="true"></span>
            </a>
          </li>
          {pages.map(page => (
            <li key={page} class={this.current === page ? 'active' : undefined}>
              {this.current === page
                ? (
                  <span aria-current="page">{page}</span>
                )
                : (
                  <a href={this.createLink(page)} onClick={e => this.clickHandler(e, page)}>{page}</a>
                )}
            </li>
          ))}
          <li class={this.current === pages[pages.length - 1] ? 'dso-page-hidden' : undefined}>
            <a href={this.createLink(pages[pages.length - 1])} aria-label="Volgende" onClick={e => this.clickHandler(e, pages[pages.length - 1])}>
              <span class="dso-next" aria-hidden="true"></span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
