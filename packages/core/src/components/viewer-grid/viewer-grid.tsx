import { h, Component, Prop, State, Host, Element, Event, EventEmitter, Watch } from "@stencil/core";
import { FocusTrap, createFocusTrap } from "focus-trap";
import { ViewerGridFilterpanelButtons } from "./viewer-grid-filterpanel-buttons";
import { FilterpanelEvent, LabelSizeMap, MainSize, ViewerGridChangeSizeEvent } from "./viewer-grid.interfaces";

@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {
  private sizeLabelMap: LabelSizeMap = {
    small: "smal",
    medium: "middel",
    large: "breed",
  };

  private mapPanel?: HTMLDivElement;

  /**
   * Set to true when filterpanel should show.
   */
  @Prop({ reflect: true })
  filterpanelOpen = false;

  /**
   * Set to true when overlay should show.
   */
  @Prop({ reflect: true })
  overlayOpen = false;

  /**
   * Size of the main content panel when component loads. Changing this attribute afterwards has no effect.
   *
   * Default size is `large`.
   */
  @Prop()
  initialMainSize?: MainSize;

  @State()
  mainSize: MainSize = "large";

  /**
   * Emitted when user wants to close the overlay.
   */
  @Event()
  dsoCloseOverlay!: EventEmitter<MouseEvent | KeyboardEvent>;

  /**
   * Emitted when user cancels filterpanel.
   */
  @Event()
  dsoFilterpanelCancel!: EventEmitter<FilterpanelEvent>;

  /**
   * Emitted when user applies filterpanel options.
   */
  @Event()
  dsoFilterpanelApply!: EventEmitter<FilterpanelEvent>;

  /**
   * Emitted before and after main size animation. Inspect `detail` property for more information.
   */
  @Event()
  dsoMainSizeChange!: EventEmitter<ViewerGridChangeSizeEvent>;

  @Element()
  host!: HTMLDsoViewerGridElement;

  private filterpanel: HTMLElement | undefined;

  private filterpanelSlot: HTMLElement | null = null;

  private filterpanelFocustrap: FocusTrap | undefined;

  private overlay: HTMLDivElement | undefined;

  private overlaySlot: HTMLDivElement | null = null;

  private overlayFocustrap: FocusTrap | undefined;

  @Watch("mainSize")
  mainSizeWatcher(currentSize: MainSize, previousSize: MainSize) {
    this.dsoMainSizeChange.emit({
      stage: "start",
      previousSize,
      currentSize,
    });

    this.mapPanel?.addEventListener(
      "transitionend",
      (e) => {
        if (e.propertyName === "flex-basis") {
          this.dsoMainSizeChange.emit({
            stage: "end",
            previousSize,
            currentSize,
          });
        }
      },
      { once: true }
    );
  }

  private shrinkMain = () => {
    this.mainSize = this.mainSize === "large" ? "medium" : "small";
  };

  private expandMain = () => {
    this.mainSize = this.mainSize === "small" ? "medium" : "large";
  };

  private updateFocusTrap() {
    if (this.filterpanelOpen && this.overlayOpen) {
      return;
    }

    if (this.filterpanelFocustrap) {
      if (this.filterpanelOpen && !this.filterpanel?.hidden) {
        this.filterpanelFocustrap.activate();
        this.host.addEventListener("keydown", this.keyDownListener);
      } else {
        this.filterpanelFocustrap.deactivate();
        this.host.removeEventListener("keydown", this.keyDownListener);
      }
    }

    if (this.overlayFocustrap) {
      if (this.overlayOpen && !this.overlay?.hidden) {
        this.overlayFocustrap.activate();
        this.host.addEventListener("keydown", this.keyDownListener);
      } else {
        this.overlayFocustrap.deactivate();
        this.host.removeEventListener("keydown", this.keyDownListener);
      }
    }
  }

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }

    this.dsoCloseOverlay.emit(event);
  };

  connectedCallback() {
    this.filterpanelSlot = this.host.querySelector<HTMLDivElement>("div[slot='filterpanel']");

    this.overlaySlot = this.host.querySelector<HTMLDivElement>("div[slot='overlay']");
  }

  componentDidLoad() {
    if (this.filterpanel && this.filterpanelSlot) {
      this.filterpanelFocustrap = createFocusTrap([this.filterpanel, this.filterpanelSlot], {
        escapeDeactivates: false,
        allowOutsideClick: true,
        tabbableOptions: {
          getShadowRoot: true,
        },
      });
    }

    if (this.overlay && this.overlaySlot) {
      this.overlayFocustrap = createFocusTrap([this.overlay, this.overlaySlot], {
        escapeDeactivates: false,
        allowOutsideClick: true,
        tabbableOptions: {
          getShadowRoot: true,
        },
      });
    }

    this.updateFocusTrap();
  }

  componentWillLoad() {
    if (this.initialMainSize) {
      this.mainSize = this.initialMainSize;
    }
  }

  componentDidUpdate() {
    this.updateFocusTrap();
  }

  disconnectedCallback() {
    this.overlayFocustrap?.deactivate();
    this.filterpanelFocustrap?.deactivate();

    this.host.removeEventListener("keydown", this.keyDownListener);
  }

  private handleFilterpanelApply(mouseEvent: MouseEvent) {
    this.dsoFilterpanelApply.emit({ originalEvent: mouseEvent });
  }

  private handleFilterpanelCancel(mouseEvent: MouseEvent) {
    this.dsoFilterpanelCancel.emit({ originalEvent: mouseEvent });
  }

  render() {
    return (
      <Host {...{ [this.mainSize]: true }}>
        <div class="dso-map-panel" ref={(element) => (this.mapPanel = element)}>
          <div class="sizing-buttons">
            <span class="sr-only" aria-live="polite" aria-atomic="true">
              breedte tekstpaneel: {this.sizeLabelMap[this.mainSize]}
            </span>
            <button type="button" class="shrink" disabled={this.mainSize === "small"} onClick={this.shrinkMain}>
              <span class="sr-only">Kaartpaneel smaller maken</span>
              <dso-icon icon="chevron-left"></dso-icon>
            </button>
            <button type="button" class="expand" disabled={this.mainSize === "large"} onClick={this.expandMain}>
              <span class="sr-only">Kaartpaneel breder maken</span>
              <dso-icon icon="chevron-right"></dso-icon>
            </button>
          </div>
          <div class="main">
            <slot name="main" />
          </div>
        </div>
        <div
          id="filterpanel"
          class="filterpanel"
          hidden={!this.filterpanelOpen || !this.filterpanelSlot}
          ref={(element) => (this.filterpanel = element)}
        >
          <h1>Uw keuzes</h1>
          <ViewerGridFilterpanelButtons
            onApply={(e) => this.handleFilterpanelApply(e)}
            onCancel={(e) => this.handleFilterpanelCancel(e)}
          />
          <slot name="filterpanel" />
          <ViewerGridFilterpanelButtons
            onApply={(e) => this.handleFilterpanelApply(e)}
            onCancel={(e) => this.handleFilterpanelCancel(e)}
          />
        </div>
        <div class="map">
          <slot name="map" />
        </div>
        <div hidden={!this.overlayOpen || !this.overlaySlot} class="dimscreen"></div>
        <div
          class="overlay"
          hidden={!this.overlayOpen || !this.overlaySlot}
          ref={(element) => (this.overlay = element)}
        >
          <button type="button" class="overlay-close-button" onClick={(e) => this.dsoCloseOverlay.emit(e)}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">sluiten</span>
          </button>
          <slot name="overlay" />
          {/* This button is needed for the `focus-trap` library to function correctly. It is never focused. */}
          <button aria-hidden="true" type="button" class="overlay-close-button" style={{ zIndex: "-100" }}>
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">sluiten</span>
          </button>
        </div>
      </Host>
    );
  }
}
