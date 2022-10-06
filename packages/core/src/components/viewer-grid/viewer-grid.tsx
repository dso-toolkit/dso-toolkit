import {
  h,
  Component,
  Prop,
  State,
  Host,
  Element,
  Event,
  EventEmitter,
  Watch,
} from "@stencil/core";
import { FocusTrap, createFocusTrap } from "focus-trap";
import { ViewerGridFilterpanelButtons } from './viewer-grid-filterpanel-buttons';

export type MainSize = "small" | "medium" | "large";

export type LabelSizeMap = { [key in MainSize]: string; }

export interface ViewerGridChangeSizeEvent {
  /**
   * Indicates whether it's before or after the animation
   */
  stage: 'start' | 'end';
  previousSize: MainSize;
  currentSize: MainSize;
}

export interface FilterpanelEvent {
  originalEvent: MouseEvent;
}

const TRANSITION_TIME = 200; // Keep in sync with dso-viewer-grid.variables.scss:$dso-viewer-grid-transition-time;

@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {

  private sizeLabelMap: LabelSizeMap = {
    small: 'smal',
    medium: 'middel',
    large: 'breed',
  }

  @Prop({ reflect: true })
  filterpanelOpen = false;

  @Prop({ reflect: true })
  overlayOpen = false;

  /**
   * Size of the main content panel when component loads. Changing this attribute afterwards has no effect.
   */
  @Prop()
  initialMainSize: MainSize = "large";

  @State()
  mainSize: MainSize = this.initialMainSize;

  @Event()
  dsoCloseOverlay!: EventEmitter<MouseEvent | KeyboardEvent>;

  @Event()
  dsoFilterpanelCancel!: EventEmitter<FilterpanelEvent>;

  @Event()
  dsoFilterpanelApply!: EventEmitter<FilterpanelEvent>;

  @Event()
  dsoMainSizeChange!: EventEmitter<ViewerGridChangeSizeEvent>;

  @Element()
  host!: HTMLElement;

  filterpanel: HTMLElement | undefined;

  filterpanelSlot: HTMLElement | null = null;

  filterpanelFocustrap: FocusTrap | undefined;

  overlay: HTMLDivElement | undefined;

  overlaySlot: HTMLDivElement | null = null;

  overlayFocustrap: FocusTrap | undefined;

  @Watch('mainSize')
  mainSizeWatcher(currentSize: MainSize, previousSize: MainSize) {
    this.dsoMainSizeChange.emit({
      stage: 'start',
      previousSize,
      currentSize
    });

    setTimeout(() => {
      this.dsoMainSizeChange.emit({
        stage: 'end',
        previousSize,
        currentSize
      });
    }, TRANSITION_TIME);
  }

  shrinkMain = () => {
    this.mainSize = this.mainSize === 'large' ? 'medium' : 'small';
  };

  expandMain = () => {
    this.mainSize = this.mainSize === 'small' ? 'medium' : 'large';
  };

  updateFocusTrap() {
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

  keyDownListener = (event: KeyboardEvent) => {
    if (event.key != "Escape") {
      return;
    }

    this.dsoCloseOverlay.emit(event);
  };

  connectedCallback() {
    this.filterpanelSlot = this.host.querySelector<HTMLDivElement>(
      "div[slot='filterpanel']"
    );

    this.overlaySlot = this.host.querySelector<HTMLDivElement>(
      "div[slot='overlay']"
    );
  }

  componentDidLoad() {
    if (this.filterpanel && this.filterpanelSlot) {
      this.filterpanelFocustrap = createFocusTrap([this.filterpanel, this.filterpanelSlot], {
        escapeDeactivates: false,
        allowOutsideClick: true,
        tabbableOptions: {
          getShadowRoot: true,
        }
      });
    }

    if (this.overlay && this.overlaySlot) {
      this.overlayFocustrap = createFocusTrap([this.overlay, this.overlaySlot], {
        escapeDeactivates: false,
        allowOutsideClick: true,
        tabbableOptions: {
          getShadowRoot: true,
        }
      });
    }

    this.updateFocusTrap();
  }

  componentDidUpdate() {
    this.updateFocusTrap();
  }

  disconnectedCallback() {
    this.overlayFocustrap?.deactivate();
    this.filterpanelFocustrap?.deactivate();

    this.host.removeEventListener("keydown", this.keyDownListener);
  }

  handleFilterpanelApply(mouseEvent: MouseEvent) {
    this.dsoFilterpanelApply.emit({ originalEvent: mouseEvent });
  }

  handleFilterpanelCancel(mouseEvent: MouseEvent) {
    this.dsoFilterpanelCancel.emit({ originalEvent: mouseEvent });
  }

  render() {
    return (
      <Host {...{ [this.mainSize]: true }}>
        <div class="dso-map-panel">
          <div class="sizing-buttons">
            <span class="sr-only" aria-live="polite" aria-atomic="true">breedte tekstpaneel: {this.sizeLabelMap[this.mainSize]}</span>
            <button
              type="button"
              class="shrink"
              disabled={this.mainSize == "small"}
              onClick={this.shrinkMain}
            >
              <dso-icon icon="chevron-left"></dso-icon>
            </button>
            <button
              type="button"
              class="expand"
              disabled={this.mainSize == "large"}
              onClick={this.expandMain}
            >
              <dso-icon icon="chevron-right"></dso-icon>
            </button>
          </div>
          <div class="main">
            <slot name="main" />
          </div>
        </div>
        <div
          id="filterpanel"
          hidden={!this.filterpanelOpen || !this.filterpanelSlot}
          ref={(element) => this.filterpanel = element}
        >
          <h2>Uw keuzes</h2>
          <ViewerGridFilterpanelButtons onApply={e => this.handleFilterpanelApply(e)} onCancel={e => this.handleFilterpanelCancel(e)} />
          <slot name="filterpanel" />
          <ViewerGridFilterpanelButtons onApply={e => this.handleFilterpanelApply(e)} onCancel={e => this.handleFilterpanelCancel(e)} />
        </div>
        <div class="map">
          <slot name="map" />
        </div>
        <div
          class="overlay"
          hidden={!this.overlayOpen || !this.overlaySlot}
          ref={(element) => (this.overlay = element)}
        >
          <button
            type="button"
            class="overlay-close-button"
            onClick={(e) => this.dsoCloseOverlay.emit(e)}
          >
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">sluiten</span>
          </button>
          <slot name="overlay" />
          {/* This button is needed for the `focus-trap` library to function correctly. It is never focused. */}
          <button
            aria-hidden="true"
            type="button"
            class="overlay-close-button"
            style={{ zIndex: '-100' }}
          >
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">sluiten</span>
          </button>
        </div>
      </Host>
    );
  }
}
