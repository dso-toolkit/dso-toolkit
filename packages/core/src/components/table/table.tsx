import { h, Component, ComponentInterface, Element, Host, Prop, State, Watch } from '@stencil/core';
import debounce from 'debounce';
import { createFocusTrap, FocusTrap } from 'focus-trap';
import { v4 } from 'uuid';

import { TableInterface } from './table.interfaces';

@Component({
  tag: 'dso-table',
  styleUrl: 'table.scss',
  shadow: true,
})
export class Table implements ComponentInterface, TableInterface {
  private resizeObserver?: ResizeObserver;

  private focusTrapElement?: HTMLDivElement;

  private buttonElement?: HTMLButtonElement;

  private trap?: FocusTrap;

  private labelledbyId = v4();

  @Element()
  host!: HTMLElement;

  /** Allows the table to be scrolled horizontally if it does not fit. */
  @Prop({ reflect: true })
  responsive = false;

  /** Allows the table to opened in a modal. */
  @Prop({ reflect: true })
  modal = false;

  /** Indicates whether the table is currently horizontally scrollable */
  @Prop({ reflect: true })
  isResponsive = false;

  @State()
  modalActive = false;

  @State()
  placeholderHeight?: number;

  @Watch('responsive')
  toggleResponsiveBehavior(responsive: boolean): void {
    if (responsive) {
      this.resizeObserver?.observe(this.host);
    }
    else {
      this.resizeObserver?.unobserve(this.host);
      this.isResponsive = false;
    }
  }

  componentWillLoad(): void {
    this.resizeObserver = new ResizeObserver(debounce(entries => this.setResponsiveTable(entries), 200));
  }

  componentDidLoad(): void {
    this.toggleResponsiveBehavior(this.responsive);
  }

  componentDidRender() {
    this.setFocusTrap();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const caption = this.host.querySelector(':scope > table > caption')?.textContent;

    return (
      <Host>
        {this.modalActive && this.placeholderHeight && (
          <div class="dso-table-placeholder" style={{ height: `${this.placeholderHeight}px` }} />
        )}

        <div class={{ 'dso-modal': this.modalActive }}>
          <div
            class={{ 'dso-dialog': this.modalActive, 'dso-table-dialog': true }}
            ref={element => this.focusTrapElement = element}
            {...this.modalActive ? { ['aria-labelledby']: this.labelledbyId, role: 'dialog' } : {}}
          >
            {(this.isResponsive || this.modal) && (
              <div class="dso-table-utilities" style={this.modalActive ? { display: 'none' } : undefined}>
                {this.isResponsive && (
                  <div class="dso-responsive-message">
                    <span>beweeg de tabel van links naar rechts</span>
                  </div>
                )}

                {this.modal && (
                  <button
                    type="button"
                    class="dso-tertiary open-modal-button"
                    ref={element => this.buttonElement = element}
                    onClick={() => this.openModal()}
                  >
                    <span class="sr-only">tabel {caption ?? ''} </span>
                    <span>vergroten</span>
                    <dso-icon icon="external-link"></dso-icon>
                  </button>
                )}
              </div>
            )}

            {this.modalActive && (
              <div class="dso-header">
                <h2 id={this.labelledbyId} class={{ 'sr-only': !caption }}>{caption || 'Uitvergrote tabel dialoog'}</h2>
                <button
                  type="button"
                  class="dso-close"
                  onClick={() => this.closeModal()}
                >
                  <dso-icon icon="times"></dso-icon>
                  <span class="sr-only">Sluiten</span>
                </button>
              </div>
            )}

            <div class={{ 'dso-body': this.modalActive, 'dso-table-body': true }}>
              <slot></slot>
            </div>

          </div>
        </div>
      </Host >
    );
  }

  private openModal() {
    this.placeholderHeight = this.host.clientHeight;
    document.body.classList.add('dso-modal-open');
    this.modalActive = true;
  }

  private closeModal() {
    this.placeholderHeight = undefined;
    document.body.classList.remove('dso-modal-open', 'dso-modal-open');
    this.modalActive = false;
  }

  private setFocusTrap() {
    if (this.modalActive && this.focusTrapElement && !this.trap) {
      this.trap = createFocusTrap([this.host, this.focusTrapElement], {
        escapeDeactivates: true,
        clickOutsideDeactivates: (e) => {
          if (e instanceof MouseEvent && e.composedPath()[0] === this.focusTrapElement) {
            this.closeModal();

            return false;
          }

          return true;
        },
        setReturnFocus: this.buttonElement ?? false,
        onDeactivate: () => this.closeModal(),
        tabbableOptions: {
          getShadowRoot: true,
        }
      }).activate();
    }
    else if (!this.modalActive && this.trap) {
      this.trap?.deactivate();

      delete this.trap;
    }
  }

  private setResponsiveTable([dsoTable]: ResizeObserverEntry[]): void {
    const tableElement = dsoTable.target.querySelector('table');

    if (dsoTable && tableElement instanceof HTMLTableElement) {
      this.isResponsive = Math.floor(tableElement.getBoundingClientRect().width) > Math.floor(dsoTable.contentRect.width);
    }
  }
}
