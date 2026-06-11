import { Component, ComponentInterface, Element, Fragment, Host, Prop, State, h } from "@stencil/core";
import debounce from "debounce";

@Component({
  tag: "dso-table",
  styleUrl: "table.scss",
  shadow: true,
})
export class Table implements ComponentInterface {
  private resizeObserver?: ResizeObserver;
  private resizeFrameId?: number;
  private pendingResizeEntry?: ResizeObserverEntry;

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

  private scheduleResponsiveTable(entry: ResizeObserverEntry): void {
    this.pendingResizeEntry = entry;

    if (this.resizeFrameId !== undefined) {
      return;
    }

    this.resizeFrameId = requestAnimationFrame(() => {
      this.resizeFrameId = undefined;

      if (!this.pendingResizeEntry) {
        return;
      }

      this.setResponsiveTable(this.pendingResizeEntry);
      this.pendingResizeEntry = undefined;
    });
  }

  componentWillLoad(): void {
    this.resizeObserver = new ResizeObserver(
      debounce((entries) => {
        if (!entries[0]) {
          throw new Error("No dsoTable found");
        }

        this.scheduleResponsiveTable(entries[0]);
      }, 200),
    );
  }

  componentDidLoad(): void {
    this.startResponsiveBehavior();
  }

  disconnectedCallback() {
    if (this.resizeFrameId !== undefined) {
      cancelAnimationFrame(this.resizeFrameId);
      this.resizeFrameId = undefined;
    }

    this.resizeObserver?.disconnect();
  }

  render() {
    const caption = this.host.querySelector(":scope > table > caption")?.textContent?.trim();
    const dialogLabel = caption || "Uitvergrote tabel";

    return (
      <Host is-responsive={this.isResponsive?.toString()}>
        {this.modalActive && this.placeholderHeight && (
          <div class="dso-table-placeholder" style={{ height: `${this.placeholderHeight}px` }} />
        )}

        {this.modalActive ? (
          <dso-modal
            modalTitle={caption ? dialogLabel : undefined}
            closable
            returnFocus={false}
            onDsoClose={() => this.closeModal()}
          >
            {!caption && (
              <span slot="body" class="sr-only">
                {dialogLabel}
              </span>
            )}
            <div slot="body" class="dso-table-body">
              <slot />
            </div>
          </dso-modal>
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
    this.modalActive = false;
  }

  private setResponsiveTable(dsoTable: ResizeObserverEntry): void {
    const tableElement = dsoTable.target.querySelector("table");

    if (dsoTable && tableElement instanceof HTMLTableElement) {
      const isResponsive =
        Math.floor(tableElement.getBoundingClientRect().width) > Math.floor(dsoTable.contentRect.width);

      if (this.isResponsive !== isResponsive) {
        this.isResponsive = isResponsive;
      }
    }
  }
}
