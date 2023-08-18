import { h, Component, Prop, State, Host, Element, Event, EventEmitter, Watch } from "@stencil/core";
import clsx from "clsx";

import {
  FilterpanelEvent,
  LabelSizeMap,
  MainSize,
  OverlayEvent,
  TabLabelMap,
  Tabs,
  ViewerGridChangeSizeEvent,
  tabs,
} from "./viewer-grid.interfaces";
import { Filterpanel, MapPanel, Overlay } from "./components";

@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {
  private mediaCondition = `(min-width: ${768 + 40}px)`;

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
  dsoCloseOverlay!: EventEmitter<OverlayEvent>;

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

  private filterpanel: HTMLDialogElement | undefined;

  private filterpanelSlot: HTMLElement | null = null;

  private overlay: HTMLDialogElement | undefined;

  private overlaySlot: HTMLDivElement | null = null;

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

  @Watch("filterpanelOpen")
  filterpanelOpenWatcher(open: boolean) {
    if (!this.filterpanelSlot) {
      console.warn("slot 'filterpanel' has not been set");
    }

    if (open) {
      this.filterpanel?.showModal();
    } else {
      this.filterpanel?.close();
    }
  }

  @Watch("overlayOpen")
  overlayOpenWatcher(open: boolean) {
    if (!this.overlaySlot) {
      console.warn("slot 'overlay' has not been set");
    }

    if (open) {
      this.overlay?.showModal();
    } else {
      this.overlay?.close();
    }
  }

  private shrinkMain = () => {
    this.mainSize = this.mainSize === "large" ? "medium" : "small";
  };

  private expandMain = () => {
    this.mainSize = this.mainSize === "small" ? "medium" : "large";
  };

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }

    this.dsoCloseOverlay.emit({ originalEvent: event });
  };

  private changeListener = (largeScreen: MediaQueryListEvent) => (this.tabView = !largeScreen.matches);

  connectedCallback() {
    window.matchMedia(this.mediaCondition).addEventListener("change", this.changeListener);

    this.filterpanelSlot = this.host.querySelector<HTMLDivElement>("div[slot='filterpanel']");

    this.overlaySlot = this.host.querySelector<HTMLDivElement>("div[slot='overlay']");
  }

  componentDidLoad() {
    if (this.filterpanelOpen && this.filterpanelSlot) {
      this.filterpanel?.showModal();
    }

    if (this.overlayOpen && this.overlaySlot) {
      this.overlay?.showModal();
    }
  }

  componentWillLoad() {
    if (this.initialMainSize) {
      this.mainSize = this.initialMainSize;
    }
  }

  disconnectedCallback() {
    this.host.removeEventListener("keydown", this.keyDownListener);
    window.matchMedia(this.mediaCondition).removeEventListener("change", this.changeListener);
  }

  private handleFilterpanelApply(mouseEvent: MouseEvent | Event) {
    this.dsoFilterpanelApply.emit({ originalEvent: mouseEvent });
  }

  private handleFilterpanelCancel(mouseEvent: MouseEvent | Event) {
    this.dsoFilterpanelCancel.emit({ originalEvent: mouseEvent });
  }

  render() {
    return (
      <Host {...{ [this.mainSize]: true }}>
        {this.tabView && (
          <nav class="dso-navbar">
            <ul class="dso-nav dso-nav-sub">
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
                  Breedte hoofdpaneel: {this.sizeLabelMap[this.mainSize]}
                </span>
                <button type="button" class="shrink" disabled={this.mainSize === "small"} onClick={this.shrinkMain}>
                  <span class="sr-only">Hoofdpaneel smaller maken</span>
                  <dso-icon icon="chevron-left"></dso-icon>
                </button>
                <button type="button" class="expand" disabled={this.mainSize === "large"} onClick={this.expandMain}>
                  <span class="sr-only">Hoofdpaneel breder maken</span>
                  <dso-icon icon="chevron-right"></dso-icon>
                </button>
              </div>
            )}
          </MapPanel>
        )}
        <Filterpanel
          ref={(element) => (this.filterpanel = element)}
          onApply={(e) => this.handleFilterpanelApply(e)}
          onCancel={(e) => this.handleFilterpanelCancel(e)}
        ></Filterpanel>
        {(!this.tabView || (this.tabView && this.activeTab === "map")) && (
          <div class="map">
            <slot name="map" />
          </div>
        )}
        <Overlay
          ref={(element) => (this.overlay = element)}
          dsoCloseOverlay={(e) => this.dsoCloseOverlay.emit({ originalEvent: e })}
        ></Overlay>
      </Host>
    );
  }
}
