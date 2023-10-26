import { Component, Element, Event, EventEmitter, Fragment, Method, Prop, State, Watch, h } from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import { DocumentPanel, Filterpanel, MainPanel, Overlay } from "./components";
import {
  ViewerGridPanelSize,
  ViewerGridVdkTab,
  ViewerGridVrkTab,
  ViewerGridChangeSizeAnimationEndEvent,
  ViewerGridChangeSizeEvent,
  ViewerGridCloseOverlayEvent,
  ViewerGridFilterpanelApplyEvent,
  ViewerGridFilterpanelCancelEvent,
  ViewerGridMainExpandEvent,
  ViewerGridMainToggleEvent,
  ViewerGridActiveTabSwitchEvent,
  ViewerGridMode,
  viewerGridTabLabelMap,
  viewerGridVdkTabs,
  viewerGridVrkTabs,
  ViewerGridTab,
} from "./viewer-grid.interfaces";

const resizeObserver = new ResizeObserver(
  debounce(([entry]) => {
    const shadowRoot = entry?.target.getRootNode();
    if (shadowRoot instanceof ShadowRoot && isDsoViewerGridComponent(shadowRoot.host)) {
      shadowRoot.host._checkMainPanelVisibility();
    }
  }, 50)
);

function isDsoViewerGridComponent(element: Element): element is HTMLDsoViewerGridElement {
  return element.tagName === "DSO-VIEWER-GRID";
}

const buttonWidth = 40;

const tabViewBreakpoint = 768 + buttonWidth;

const minMapElementWidth = 440;

/**
 * @slot main
 * @slot map
 * @slot filterpanel
 * @slot overlay
 * @slot document-panel - VDK only
 * @slot main-expanded - VDK only
 */
@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {
  private mediaCondition = `(min-width: ${tabViewBreakpoint}px)`;

  private mapElement?: HTMLDivElement;

  /**
   * VRK or VDK implementation.
   */
  @Prop({ reflect: true })
  mode: ViewerGridMode = "vrk";

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
   * **VDK only.** Set to true when document panel should show.
   */
  @Prop({ reflect: true })
  documentPanelOpen = false;

  /**
   * Size of the panel when component loads.
   *
   * Default size is `large`.
   */
  @Prop({ reflect: true })
  mainSize: ViewerGridPanelSize = "large";

  /**
   * Set active tab in tab view.
   */
  @Prop()
  activeTab?: ViewerGridVdkTab | ViewerGridVrkTab;

  /**
   * **VDK only.** Size of the panel when component loads.
   *
   * Default size is `large`.
   */
  @Prop({ reflect: true })
  documentPanelSize: ViewerGridPanelSize = "large";

  /**
   * **VDK only.** Set to show main panel expanded.
   */
  @Prop()
  mainPanelExpanded = false;

  /**
   * **VDK only.** Set to hide the main panel.
   */
  @Prop()
  mainPanelHidden = false;

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
   * Emitted when user applies filterpanel options.
   */
  @Event()
  dsoActiveTabSwitch!: EventEmitter<ViewerGridActiveTabSwitchEvent>;

  /**
   * Emitted on interaction with sizing buttons.
   */
  @Event()
  dsoMainSizeChange!: EventEmitter<ViewerGridChangeSizeEvent>;

  /**
   * Emitted after main size animation.
   */
  @Event()
  dsoMainSizeChangeAnimationEnd!: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;

  /**
   * **VDK only.** Emitted on interaction with sizing buttons.
   */
  @Event()
  dsoDocumentPanelSizeChange!: EventEmitter<ViewerGridChangeSizeEvent>;

  /**
   * **VDK only.** Emitted after main size animation.
   */
  @Event()
  dsoDocumentPanelSizeChangeAnimationEnd!: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;

  /**
   * **VDK only.** Emitted when the user wants to expand the main panel.
   */
  @Event()
  dsoMainPanelExpand!: EventEmitter<ViewerGridMainExpandEvent>;

  /**
   * **VDK only.** Emitted when the user toggles the visibility of the main panel.
   *
   * Also emitted by scripting when the panels do not fit anymore.
   */
  @Event()
  dsoMainPanelToggle!: EventEmitter<ViewerGridMainToggleEvent>;

  @Element()
  host!: HTMLDsoViewerGridElement;

  @State()
  tabView = window.innerWidth < tabViewBreakpoint;

  private filterpanel: HTMLDialogElement | undefined;

  private get filterpanelSlot() {
    return this.host.querySelector("[slot='filterpanel']");
  }

  private get overlaySlot() {
    return this.host.querySelector("[slot='overlay']");
  }

  private overlay: HTMLDialogElement | undefined;

  @Watch("documentPanelOpen")
  documentPanelOpenWatcher(open: boolean) {
    if (open) {
      this._checkMainPanelVisibility();
    }
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

  /**
   * @internal
   */
  @Method()
  async _checkMainPanelVisibility() {
    if (
      this.mode === "vdk" &&
      this.documentPanelOpen &&
      !this.mainPanelHidden &&
      this.mapElement instanceof HTMLDivElement &&
      ((this.mapElement.clientWidth <= minMapElementWidth + buttonWidth + buttonWidth && !this.mainPanelExpanded) ||
        (this.mapElement.clientWidth <= buttonWidth + buttonWidth && this.mainPanelExpanded))
    ) {
      this.dsoMainPanelToggle.emit({
        hide: true,
      });
    }
  }

  private switchActiveTab = (tab: ViewerGridTab) => {
    this.dsoActiveTabSwitch.emit({
      tab,
    });
  };

  private emitShrinkMain = () => {
    this.dsoMainSizeChange.emit({
      currentSize: this.mainSize,
      nextSize: this.mainSize === "large" ? "medium" : "small",
    });
  };

  private emitExpandMain = () => {
    this.dsoMainSizeChange.emit({
      currentSize: this.mainSize,
      nextSize: this.mainSize === "small" ? "medium" : "large",
    });
  };

  private shrinkDocumentPanel = () => {
    this.dsoDocumentPanelSizeChange.emit({
      currentSize: this.documentPanelSize,
      nextSize: this.documentPanelSize === "large" ? "medium" : "small",
    });
  };

  private expandDocumentPanel = () => {
    this.dsoDocumentPanelSizeChange.emit({
      currentSize: this.documentPanelSize,
      nextSize: this.documentPanelSize === "small" ? "medium" : "large",
    });
  };

  private expandContent = () => {
    this.dsoMainPanelExpand.emit({
      expand: !this.mainPanelExpanded,
    });
  };

  private toggleMainPanel = () => {
    if (
      this.mapElement instanceof HTMLDivElement &&
      this.mapElement.clientWidth <= minMapElementWidth + buttonWidth + buttonWidth
    ) {
      this.mainSize = "small";
    }

    this.dsoMainPanelToggle.emit({
      hide: !this.mainPanelHidden,
    });
  };

  private changeListener = (largeScreen: MediaQueryListEvent) => (this.tabView = !largeScreen.matches);

  private handleFilterpanelApply = (mouseEvent: MouseEvent | Event) => {
    this.dsoFilterpanelApply.emit({ originalEvent: mouseEvent });
  };

  private handleFilterpanelCancel = (mouseEvent: MouseEvent | Event) => {
    this.dsoFilterpanelCancel.emit({ originalEvent: mouseEvent });
  };

  connectedCallback() {
    window.matchMedia(this.mediaCondition).addEventListener("change", this.changeListener);
  }

  componentDidLoad() {
    if (this.filterpanelOpen && this.filterpanelSlot) {
      this.filterpanel?.showModal();
    }

    if (this.overlayOpen && this.overlaySlot) {
      this.overlay?.showModal();
    }

    if (this.mode === "vdk" && this.mapElement instanceof HTMLDivElement) {
      resizeObserver.observe(this.mapElement);
    }
  }

  disconnectedCallback() {
    window.matchMedia(this.mediaCondition).removeEventListener("change", this.changeListener);

    if (this.mode === "vdk" && this.mapElement) {
      resizeObserver.unobserve(this.mapElement);
    }
  }

  render() {
    const tabLabels = this.mode === "vdk" ? viewerGridVdkTabs : viewerGridVrkTabs;

    return (
      <>
        {this.tabView && (
          <nav class="dso-navbar">
            <ul class="dso-nav dso-nav-sub">
              {tabLabels.map((tab) => (
                <li key={tab} class={clsx({ "dso-active": this.activeTab === tab })}>
                  <button type="button" class="dso-tertiary" onClick={() => this.switchActiveTab(tab)}>
                    {viewerGridTabLabelMap[tab]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {(!this.tabView || (this.tabView && (this.activeTab === "main" || this.activeTab === "search"))) && (
          <MainPanel
            mode={this.mode}
            tabView={this.tabView}
            mainSize={this.mainSize}
            documentPanelOpen={this.documentPanelOpen}
            mainPanelExpanded={this.mainPanelExpanded}
            mainPanelHidden={this.mainPanelHidden}
            shrinkMain={this.emitShrinkMain}
            expandMain={this.emitExpandMain}
            expandContent={this.expandContent}
            toggleMainPanel={this.toggleMainPanel}
            dsoMainSizeChangeAnimationEnd={this.dsoMainSizeChangeAnimationEnd}
          ></MainPanel>
        )}
        <Filterpanel
          ref={(element) => (this.filterpanel = element)}
          onApply={this.handleFilterpanelApply}
          onCancel={this.handleFilterpanelCancel}
        ></Filterpanel>
        {(!this.tabView || (this.tabView && this.activeTab === "map")) && (
          <div class="map" ref={(element) => (this.mapElement = element)}>
            <slot name="map" />
          </div>
        )}
        {((!this.tabView && this.documentPanelOpen) || (this.tabView && this.activeTab === "document")) && (
          <DocumentPanel
            tabView={this.tabView}
            panelSize={this.documentPanelSize}
            shrinkDocumentPanel={this.shrinkDocumentPanel}
            expandDocumentPanel={this.expandDocumentPanel}
            dsoDocumentPanelSizeChangeAnimationEnd={this.dsoDocumentPanelSizeChangeAnimationEnd}
          ></DocumentPanel>
        )}
        <Overlay
          ref={(element) => (this.overlay = element)}
          dsoCloseOverlay={(e) => this.dsoCloseOverlay.emit({ originalEvent: e })}
        ></Overlay>
      </>
    );
  }
}
