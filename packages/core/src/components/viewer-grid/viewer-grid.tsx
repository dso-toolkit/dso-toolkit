import { h, Component, Prop, State, Host, Element, Event, EventEmitter, Watch } from "@stencil/core";
import { FocusTrap, createFocusTrap } from "focus-trap";
import clsx from "clsx";

import {
  FilterpanelEvent,
  LabelSizeMap,
  MainSize,
  TabLabelMap,
  Tabs,
  ViewerGridChangeSizeEvent,
  tabs,
} from "./viewer-grid.interfaces";
import { Filterpanel } from "./components/filterpanel";
import { MapPanel } from "./components/map-panel";

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

  private tabLabelMap: TabLabelMap = {
    main: "Hoofdpaneel",
    map: "Kaart",
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

  @State()
  tabView = window.innerWidth < 768;

  @State()
  activeTab: Tabs = "main";

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

  private changeListener = (largeScreen: MediaQueryListEvent) => (this.tabView = !largeScreen.matches);

  connectedCallback() {
    window.matchMedia("(min-width: 768px)").addEventListener("change", this.changeListener);

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
    window.matchMedia("(min-width: 768px)").removeEventListener("change", this.changeListener);
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
        {this.tabView && (
          <nav class="dso-navbar">
            <ul class="dso-nav dso-nav-main">
              {tabs.map((tab) => (
                <li key={tab} class={clsx({ "dso-active": this.activeTab === tab })}>
                  <button type="button" class="dso-tertiary" onClick={() => (this.activeTab = tab)}>
                    {this.tabLabelMap[tab]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {(!this.tabView || (this.tabView && this.activeTab === "main")) && (
          <MapPanel ref={(element) => (this.mapPanel = element)}>
            {!this.tabView && (
              <div class="sizing-buttons">
                <span class="sr-only" aria-live="polite" aria-atomic="true">
                  Breedte tekstpaneel: {this.sizeLabelMap[this.mainSize]}
                </span>
                <button type="button" class="shrink" disabled={this.mainSize === "small"} onClick={this.shrinkMain}>
                  <span class="sr-only">Tekstpaneel smaller maken</span>
                  <dso-icon icon="chevron-left"></dso-icon>
                </button>
                <button type="button" class="expand" disabled={this.mainSize === "large"} onClick={this.expandMain}>
                  <span class="sr-only">Tekstpaneel breder maken</span>
                  <dso-icon icon="chevron-right"></dso-icon>
                </button>
              </div>
            )}
          </MapPanel>
        )}
        <Filterpanel
          ref={(element) => (this.filterpanel = element)}
          filterpanelOpen={this.filterpanelOpen}
          filterpanelSlot={this.filterpanelSlot}
          onApply={(e) => this.handleFilterpanelApply(e)}
          onCancel={(e) => this.handleFilterpanelCancel(e)}
        ></Filterpanel>
        {(!this.tabView || (this.tabView && this.activeTab === "map")) && (
          <div class="map">
            <slot name="map" />
          </div>
        )}
        <div hidden={!this.overlayOpen || !this.overlaySlot || this.tabView} class="dimscreen"></div>
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
