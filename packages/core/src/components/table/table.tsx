import { h, Component, ComponentInterface, Element, Host, Prop, State } from '@stencil/core';
import debounce from 'debounce';

import { TableInterface } from './table.interfaces';

@Component({
  tag: 'dso-table',
  styleUrl: 'table.scss',
  shadow: true,
})
export class Table implements ComponentInterface, TableInterface {
  private resizeObserver?: ResizeObserver;

  @Element()
  host!: HTMLElement;

  /** Allows the table to be scrolled horizontally if it does not fit. */
  @Prop({ reflect: true })
  responsive = false;

  @State()
  isResponsive = false;

  componentDidLoad() {
    this.resizeObserver = new ResizeObserver(debounce(entries => this.setResponsiveTable(entries), 200));
    this.resizeObserver?.observe(this.host);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    return (
      <Host class={{ 'dso-is-responsive': this.isResponsive }}>
        {this.isResponsive && (
          <div class="dso-responsive-message">
            <span>beweeg de tabel van links naar rechts</span>
          </div>
        )}
        <div class="dso-table-wrapper">
          <slot></slot>
        </div>
      </Host>
    );
  }

  private setResponsiveTable([dsoTable]: ResizeObserverEntry[]): void {
    const tableElement = dsoTable.target.querySelector('table');

    if (dsoTable && tableElement instanceof HTMLTableElement) {
      this.isResponsive = Math.floor(tableElement.getBoundingClientRect().width) > Math.floor(dsoTable.contentRect.width);
    }
  }
}
