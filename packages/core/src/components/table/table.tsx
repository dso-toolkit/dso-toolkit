import { Component, ComponentInterface, Element, Fragment, Host, Prop, State, h } from "@stencil/core";
import debounce from "debounce";
import { v4 } from "uuid";

@Component({
  tag: "dso-table",
  styleUrl: "table.scss",
  shadow: true,
})
export class Table implements ComponentInterface {
  private resizeObserver?: ResizeObserver;

  private dialogElement?: HTMLDialogElement;

  private labelledbyId = v4();

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

  private dialogCloseEventListener = () => {
    this.closeModal();
  };

  componentWillLoad(): void {
    this.resizeObserver = new ResizeObserver(debounce((entries) => this.setResponsiveTable(entries), 200));
  }

  componentDidLoad(): void {
    this.startResponsiveBehavior();
  }

  componentDidRender() {
    if (this.modalActive) {
      this.dialogElement?.showModal();
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const caption = this.host.querySelector(":scope > table > caption")?.textContent?.trim();

    return (
      <Host is-responsive={this.isResponsive?.toString()}>
        {this.modalActive && this.placeholderHeight && (
          <div class="dso-table-placeholder" style={{ height: `${this.placeholderHeight}px` }} />
        )}

        {this.modalActive ? (
          <dialog
            class="dso-modal"
            ref={(element) => (this.dialogElement = element)}
            onClose={this.dialogCloseEventListener}
          >
            <div class="dso-dialog dso-table-dialog" aria-labelledby={this.labelledbyId}>
              <div class="dso-header">
                <h2 id={this.labelledbyId} class={{ "sr-only": !caption }}>
                  {caption || "Uitvergrote tabel dialoog"}
                </h2>
                <dso-icon-button
                  icon="times"
                  variant="tertiary"
                  class="dso-close"
                  label="Sluiten"
                  onClick={() => this.closeModal()}
                />
              </div>

              <div class="dso-body dso-table-body">
                <slot />
              </div>
            </div>
          </dialog>
        ) : (
          <Fragment>
            <div class="dso-table-utilities" hidden={!this.isResponsive && this.noModal}>
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

            <div class="dso-table-body">
              <slot />
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
    this.dialogElement?.close();
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
