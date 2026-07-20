import { Component, Element, Event, EventEmitter, Fragment, Method, Prop, State, Watch, h } from "@stencil/core";
import { clsx } from "clsx";
import debounce from "debounce";

import { DocumentPanel, FilterPanel, MainPanel, Overlay } from "./components";
import {
  ViewerGridActiveTabSwitchEvent,
  ViewerGridChangeSizeAnimationEndEvent,
  ViewerGridChangeSizeEvent,
  ViewerGridCloseFilterPanelEvent,
  ViewerGridCloseOverlayEvent,
  ViewerGridMainToggleEvent,
  ViewerGridPanelSize,
  ViewerGridTab,
  viewerGridTabLabelMap,
  viewerGridTabs,
} from "./viewer-grid.interfaces";

const resizeObserver = new ResizeObserver(
  debounce(([entry]) => {
    const shadowRoot = entry?.target.getRootNode();
    if (shadowRoot instanceof ShadowRoot && isDsoViewerGridComponent(shadowRoot.host)) {
      shadowRoot.host._checkMainPanelVisibility();
    }
  }, 50),
);

function isDsoViewerGridComponent(element: Element): element is HTMLDsoViewerGridElement {
  return element.tagName === "DSO-VIEWER-GRID";
}

const buttonWidth = 40;

const tabViewBreakpoint = 992 + buttonWidth;

const minMapElementWidth = 440;

/**
 * @slot top-bar - Een slot die bovenaan de viewer over de hele breedte kan worden gevuld met bijv een banner.
 * @slot main
 * @slot map
 * @slot legend - Een slot die kan worden gevuld met een legend component.
 * @slot filter-panel
 * @slot overlay
 * @slot document-panel
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
   * The title of the filter panel
   */
  @Prop({ reflect: true })
  filterPanelTitle?: string;

  /**
   * Set to true when filter panel should show.
   */
  @Prop({ reflect: true })
  filterPanelOpen = false;

  /**
   * Set to true when overlay should show.
   */
  @Prop({ reflect: true })
  overlayOpen = false;

  /**
   * Set to true when document panel should show.
   */
  @Prop({ reflect: true })
  documentPanelOpen = false;

  /**
   * Set to true to apply print layout programmatically, e.g. for print preview.
   */
  @Prop({ reflect: true })
  print = false;

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
  activeTab?: ViewerGridTab;

  /**
   * Size of the panel when component loads.
   *
   * Default size is `large`.
   */
  @Prop({ reflect: true })
  documentPanelSize: ViewerGridPanelSize = "large";

  /**
   * Set to show main panel expanded.
   */
  @Prop()
  mainPanelExpanded = false;

  /**
   * Set to hide the main panel.
   */
  @Prop()
  mainPanelHidden = false;

  /**
   * Emitted when user wants to close the overlay.
   */
  @Event()
  dsoCloseOverlay!: EventEmitter<ViewerGridCloseOverlayEvent>;

  /**
   * Emitted when user wants to close the filter panel.
   */
  @Event()
  dsoCloseFilterPanel!: EventEmitter<ViewerGridCloseFilterPanelEvent>;

  /**
   * Emitted when user applies filter panel options.
   */
  @Event()
  dsoActiveTabSwitch!: EventEmitter<ViewerGridActiveTabSwitchEvent>;

  /**
   * Emitted after main size animation.
   */
  @Event()
  dsoMainSizeChangeAnimationEnd!: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;

  /**
   * Emitted on interaction with sizing buttons.
   */
  @Event()
  dsoDocumentPanelSizeChange!: EventEmitter<ViewerGridChangeSizeEvent>;

  /**
   * Emitted after main size animation.
   */
  @Event()
  dsoDocumentPanelSizeChangeAnimationEnd!: EventEmitter<ViewerGridChangeSizeAnimationEndEvent>;

  /**
   * Emitted when the user toggles the visibility of the main panel.
   *
   * Also emitted by scripting when the panels do not fit anymore.
   */
  @Event()
  dsoMainPanelToggle!: EventEmitter<ViewerGridMainToggleEvent>;

  @Element()
  host!: HTMLDsoViewerGridElement;

  @State()
  tabView = window.innerWidth < tabViewBreakpoint;

  private filterPanel: HTMLDialogElement | undefined;

  private get filterPanelSlot() {
    return this.host.querySelector("[slot='filter-panel']");
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

  @Watch("filterPanelOpen")
  filterPanelOpenWatcher(open: boolean) {
    if (!this.filterPanelSlot) {
      console.warn("slot 'filter-panel' has not been set");
    }

    if (open) {
      this.filterPanel?.show();
    } else {
      this.filterPanel?.close();
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

  private renderFilterPanel() {
    return (
      <FilterPanel
        open={this.filterPanelOpen}
        title={this.filterPanelTitle}
        ref={(element) => (this.filterPanel = element)}
        dsoCloseFilterPanel={(e) => this.dsoCloseFilterPanel.emit({ originalEvent: e })}
      ></FilterPanel>
    );
  }

  connectedCallback() {
    window.matchMedia(this.mediaCondition).addEventListener("change", this.changeListener);
  }

  componentDidLoad() {
    if (this.filterPanelOpen && this.filterPanelSlot) {
      this.filterPanel?.show();
    }

    if (this.overlayOpen && this.overlaySlot) {
      this.overlay?.showModal();
    }

    if (this.mapElement instanceof HTMLDivElement) {
      resizeObserver.observe(this.mapElement);
    }
  }

  disconnectedCallback() {
    window.matchMedia(this.mediaCondition).removeEventListener("change", this.changeListener);

    if (this.mapElement) {
      resizeObserver.unobserve(this.mapElement);
    }
  }

  render() {
    return (
      <Fragment>
        <slot name="top-bar" />
        <div class="viewer-grid-columns">
          {this.tabView && (
            <nav class="dso-navbar">
              <ul class="dso-nav dso-nav-sub">
                {viewerGridTabs.map((tab) => (
                  <li key={tab} class={clsx({ "dso-active": this.activeTab === tab })}>
                    <button
                      type="button"
                      class="dso-tertiary"
                      aria-current={this.activeTab === tab ? "page" : undefined}
                      onClick={() => this.switchActiveTab(tab)}
                    >
                      {viewerGridTabLabelMap[tab]}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {(!this.tabView || (this.tabView && this.activeTab === "search") || this.print) && (
            <MainPanel
              tabView={this.tabView}
              mainSize={this.mainSize}
              documentPanelOpen={this.documentPanelOpen}
              mainPanelExpanded={this.mainPanelExpanded}
              mainPanelHidden={this.mainPanelHidden}
              toggleMainPanel={this.toggleMainPanel}
              dsoMainSizeChangeAnimationEnd={this.dsoMainSizeChangeAnimationEnd}
              printFilterPanel={
                !this.tabView && this.filterPanelOpen && this.print ? this.renderFilterPanel() : undefined
              }
            ></MainPanel>
          )}
          {(!this.tabView || (this.tabView && this.activeTab === "search")) && !this.print && this.renderFilterPanel()}
          {(!this.tabView || (this.tabView && this.activeTab === "map") || this.print) && (
            <div class="map-area">
              <div class="map" ref={(element) => (this.mapElement = element)}>
                <slot name="map" />
              </div>
              <slot name="legend" />
            </div>
          )}
          {((!this.tabView && this.documentPanelOpen) ||
            (this.tabView && this.activeTab === "document") ||
            this.print) && (
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
        </div>
      </Fragment>
    );
  }
}
