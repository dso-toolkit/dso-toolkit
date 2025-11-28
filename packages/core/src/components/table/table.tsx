import { Component, ComponentInterface, Element, Fragment, Host, Prop, State, Watch, h } from "@stencil/core";
import debounce from "debounce";

@Component({
  tag: "dso-table",
  styleUrl: "table.scss",
  shadow: true,
})
export class Table implements ComponentInterface {
  private resizeObserver?: ResizeObserver;

  @Element()
  host!: HTMLDsoTableElement;

  /**
   * Prevents the table being opened in a modal.
   */
  @Prop({ reflect: true })
  noModal = false;

  @State()
  isResponsive?: boolean;

  @State()
  modalActive = false;

  @State()
  placeholderHeight?: number;

  private startResponsiveBehavior(): void {
    this.resizeObserver?.observe(this.host);
  }

  componentWillLoad(): void {
    this.resizeObserver = new ResizeObserver(debounce((entries) => this.setResponsiveTable(entries), 200));
  }

  componentDidLoad(): void {
    this.startResponsiveBehavior();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const caption = this.host.querySelector(":scope > table > caption")?.textContent?.trim();
    const table: HTMLTableElement | null = this.host.querySelector(":scope > table");

    if (table && this.modalActive) {
      this.host.querySelector("dso-modal *[slot='body']")?.appendChild(table);
    }

    return (
      <Host is-responsive={this.isResponsive?.toString()}>
        {this.modalActive && this.placeholderHeight && (
          <div class="dso-table-placeholder" style={{ height: `${this.placeholderHeight}px` }} />
        )}

        {this.modalActive && (
          <dso-modal
            closable
            dialog-role="dialog"
            fullscreen
            modal-title={caption || "Uitvergrote tabel dialoog"}
            onDsoClose={() => this.closeModal()}
          >
            <div slot="body" innerHTML={table?.outerHTML}></div>
          </dso-modal>
        )}

        {!this.modalActive && (
          <Fragment>
            {(this.isResponsive || !this.noModal) && (
              <div class="dso-table-utilities">
                {this.isResponsive && (
                  <div class="dso-responsive-message">
                    <span>beweeg de tabel van links naar rechts</span>
                  </div>
                )}

                {!this.noModal && (
                  <button type="button" class="dso-tertiary open-modal-button" onClick={() => this.openModal()}>
                    <span class="sr-only">tabel {caption ?? ""} </span>
                    <span>vergroten</span>
                    <dso-icon icon="external-link"></dso-icon>
                  </button>
                )}
              </div>
            )}

            <div class="dso-table-body">
              <slot></slot>
            </div>
          </Fragment>
        )}
      </Host>
    );
  }

  private openModal() {
    this.placeholderHeight = this.host.clientHeight;
    this.modalActive = true;
  }

  private closeModal() {
    this.placeholderHeight = undefined;
    this.modalActive = false;
  }

  private setResponsiveTable([dsoTable]: ResizeObserverEntry[]): void {
    if (!dsoTable) {
      throw new Error("No dsoTable found");
    }

    const tableElement = dsoTable.target.querySelector("table");

    if (dsoTable && tableElement instanceof HTMLTableElement) {
      this.isResponsive =
        Math.floor(tableElement.getBoundingClientRect().width) > Math.floor(dsoTable.contentRect.width);
    }
  }
}
