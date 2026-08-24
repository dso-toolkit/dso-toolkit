import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";

import { GridColumnCloseEvent } from "./grid-column.interfaces";

const overlayMediaQuery = "(min-width: 768px)";

/**
 * @slot - The default slot for the column content.
 */
@Component({
  tag: "dso-grid-column",
  styleUrl: "grid-column.scss",
  shadow: true,
})
export class GridColumn implements ComponentInterface {
  private dialogElement: HTMLDialogElement | undefined;

  private mediaQueryList: MediaQueryList | undefined;

  private resizeObserver: ResizeObserver | undefined;

  @Element()
  host!: HTMLDsoGridColumnElement;

  /**
   * The column widths per breakpoint (e.g. "xs-4", "md-6 lg-8"). Without "col-" prefix. Widths only; push, pull and
   * offset are not supported.
   */
  @Prop({ reflect: true })
  columns!: string | undefined;

  /**
   * When set, the column content expands to the full width of the row and renders as a modal overlay with a backdrop.
   * The column keeps its own place in the row; the overlay panel is anchored to the row and scrolls with the page.
   * Below the sm breakpoint the overlay does not apply and the content stays in the flow of the page.
   */
  @Prop({ reflect: true })
  overlay = false;

  @State()
  overlayActive = false;

  /**
   * Emitted when the user dismisses the overlay: a click on the backdrop or the Escape key.
   */
  @Event({ bubbles: false })
  dsoClose!: EventEmitter<GridColumnCloseEvent>;

  @Watch("overlay")
  overlayWatcher() {
    this.syncOverlayActive();
  }

  connectedCallback() {
    this.mediaQueryList = window.matchMedia(overlayMediaQuery);
    this.mediaQueryList.addEventListener("change", this.syncOverlayActive);
    this.syncOverlayActive();
  }

  disconnectedCallback() {
    this.mediaQueryList?.removeEventListener("change", this.syncOverlayActive);
    this.mediaQueryList = undefined;
    this.stopObserving();
  }

  componentDidRender() {
    if (!this.overlayActive) {
      this.stopObserving();

      return;
    }

    if (this.dialogElement && !this.dialogElement.open) {
      this.dialogElement.showModal();
    }

    this.positionOverlay();
    this.startObserving();
  }

  private syncOverlayActive = () => {
    this.overlayActive = this.overlay && (this.mediaQueryList?.matches ?? false);
  };

  private positionOverlay() {
    const row = this.host.parentElement;

    if (!row?.classList.contains("row")) {
      console.warn('Grid Column: overlay requires the column to be a direct child of a "row" element');

      return;
    }

    const rowRect = row.getBoundingClientRect();
    const hostRect = this.host.getBoundingClientRect();
    const gutter = parseFloat(getComputedStyle(this.host).paddingInlineStart) || 0;

    this.host.style.setProperty("--_dso-grid-column-overlay-inset-block-start", `${hostRect.top + window.scrollY}px`);
    this.host.style.setProperty(
      "--_dso-grid-column-overlay-inset-inline-start",
      `${rowRect.left + window.scrollX + gutter}px`,
    );
    this.host.style.setProperty("--_dso-grid-column-overlay-inline-size", `${rowRect.width - gutter * 2}px`);
  }

  private startObserving() {
    if (this.resizeObserver) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.positionOverlay());
    this.resizeObserver.observe(document.body);
    this.resizeObserver.observe(this.host);

    if (this.host.parentElement) {
      this.resizeObserver.observe(this.host.parentElement);
    }
  }

  private stopObserving() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private handleDialogClick = (event: MouseEvent) => {
    if (!this.dialogElement || event.target !== this.dialogElement) {
      return;
    }

    const { left, right, top, bottom } = this.dialogElement.getBoundingClientRect();

    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
      this.dsoClose.emit({ originalEvent: event });
    }
  };

  private handleDialogCancel = (event: Event) => {
    event.preventDefault();
    this.dsoClose.emit({ originalEvent: event });
  };

  private handleDialogClose = (event: Event) => {
    this.dsoClose.emit({ originalEvent: event });

    if (this.overlayActive && this.dialogElement && !this.dialogElement.open) {
      this.dialogElement.showModal();
    }
  };

  render() {
    return (
      <Host>
        {this.overlayActive ? (
          <dialog
            class="grid-column-content"
            ref={(element) => (this.dialogElement = element)}
            onClick={this.handleDialogClick}
            onCancel={this.handleDialogCancel}
            onClose={this.handleDialogClose}
          >
            <slot />
          </dialog>
        ) : (
          <div class="grid-column-content">
            <slot />
          </div>
        )}
      </Host>
    );
  }
}
