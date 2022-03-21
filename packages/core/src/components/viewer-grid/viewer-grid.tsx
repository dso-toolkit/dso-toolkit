import {
  h,
  Component,
  Prop,
  State,
  Host,
  Element,
  Event,
  EventEmitter,
} from "@stencil/core";
import { FocusTrap, createFocusTrap } from "focus-trap";
import { ViewerGridFilterpanelButtons } from './viewer-grid-filterpanel-buttons';

type MainSize = "small" | "medium" | "large";

export interface FilterpanelEvent {
  originalEvent: MouseEvent;
}

@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {
  @Prop({ reflect: true })
  filterpanelOpen = false;

  @Prop({ reflect: true })
  overlayOpen = false;

  @State()
  mainSize: MainSize = "large";

  @Event()
  closeOverlay!: EventEmitter<MouseEvent | KeyboardEvent>;

  @Event()
  filterpanelCancel!: EventEmitter<FilterpanelEvent>;

  @Event()
  filterpanelApply!: EventEmitter<FilterpanelEvent>;

  @Element()
  host!: HTMLElement;

  filterpanel: HTMLElement | undefined;

  filterpanelSlot: HTMLElement | null = null;

  filterpanelFocustrap: FocusTrap | undefined;

  overlay: HTMLDivElement | undefined;

  overlaySlot: HTMLDivElement | null = null;

  overlayFocustrap: FocusTrap | undefined;

  shrinkMain = () => {
    this.mainSize = this.mainSize == "large" ? "medium" : "small";
  };

  expandMain = () => {
    this.mainSize = this.mainSize == "small" ? "medium" : "large";
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

    this.closeOverlay.emit(event);
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
      });
    }

    if (this.overlay && this.overlaySlot) {
      this.overlayFocustrap = createFocusTrap([this.overlay, this.overlaySlot], {
        escapeDeactivates: false,
        allowOutsideClick: true,
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
    this.filterpanelApply.emit({ originalEvent: mouseEvent });
  }

  handleFilterpanelCancel(mouseEvent: MouseEvent) {
    this.filterpanelCancel.emit({ originalEvent: mouseEvent });
  }

  render() {
    return (
      <Host {...{ [this.mainSize]: true }}>
        <div class="dso-map-panel">
          <div class="sizing-buttons">
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
            onClick={(e) => this.closeOverlay.emit(e)}
          >
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">sluiten</span>
          </button>
          <slot name="overlay" />
        </div>
      </Host>
    );
  }
}
