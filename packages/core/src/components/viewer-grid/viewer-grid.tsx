import { h, Component, Prop, State, Host, Element, Event, EventEmitter, Watch } from "@stencil/core";
import clsx from "clsx";

import {
  MainSize,
  TabLabelMap,
  Tabs,
  ViewerGridChangeSizeEvent,
  ViewerGridCloseOverlayEvent,
  ViewerGridFilterpanelApplyEvent,
  ViewerGridFilterpanelCancelEvent,
  tabs,
} from "./viewer-grid.interfaces";
import { Filterpanel, MainPanel, Overlay } from "./components";

const tabViewWidth = 768 + 40;

@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {
  private mediaCondition = `(min-width: ${tabViewWidth}px)`;

  private tabLabelMap: TabLabelMap = {
    main: "Hoofdpaneel",
    map: "Kaart",
  };

  private mainPanel?: HTMLDivElement;

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
  tabView = window.innerWidth < tabViewWidth;

  @State()
  activeTab: Tabs = "main";

  /**
   * Emitted when user wants to close the overlay.
   */
  @Event()
  dsoCloseOverlay!: EventEmitter<ViewerGridCloseOverlayEvent>;

  /**
   * Emitted when user cancels filterpanel.
   */
  @Event()
  dsoFilterpanelCancel!: EventEmitter<ViewerGridFilterpanelCancelEvent>;

  /**
   * Emitted when user applies filterpanel options.
   */
  @Event()
  dsoFilterpanelApply!: EventEmitter<ViewerGridFilterpanelApplyEvent>;

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

    this.mainPanel?.addEventListener(
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
          <MainPanel
            ref={(element: HTMLDivElement | undefined) => (this.mainPanel = element)}
            tabView={this.tabView}
            mainSize={this.mainSize}
            shrinkMain={this.shrinkMain}
            expandMain={this.expandMain}
          ></MainPanel>
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
