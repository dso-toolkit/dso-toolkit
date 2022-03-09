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
import * as focusTrap from "focus-trap";

type MainSize = "small" | "medium" | "large";

@Component({
  tag: "dso-viewer-grid",
  styleUrl: "viewer-grid.scss",
  shadow: true,
})
export class ViewerGrid {
  @Prop()
  overlayOpen = false;

  @State()
  mainSize: MainSize = "large";

  @Event()
  closeOverlay!: EventEmitter<MouseEvent | KeyboardEvent>;

  @Element()
  host!: HTMLElement;

  overlay: HTMLDivElement | undefined;

  overlaySlot: HTMLDivElement | null | undefined;

  trap: focusTrap.FocusTrap | undefined;

  shrinkMain = () => {
    this.mainSize = this.mainSize == "large" ? "medium" : "small";
  };

  expandMain = () => {
    this.mainSize = this.mainSize == "small" ? "medium" : "large";
  };

  updateFocusTrap() {
    if (!this.trap) {
      return;
    }

    if (this.overlayOpen) {
      this.trap.activate();
      this.host.addEventListener("keydown", this.keyDownListener);
    } else {
      this.trap.deactivate();
      this.host.removeEventListener("keydown", this.keyDownListener);
    }
  }

  keyDownListener = (event: KeyboardEvent) => {
    if (event.key != "Escape") {
      return;
    }

    this.closeOverlay.emit(event);
  };

  connectedCallback() {
    this.overlaySlot = this.host.querySelector(
      "div[slot = 'overlay']"
    ) as HTMLDivElement | null;
  }

  componentDidLoad() {
    if (!this.overlay || !this.overlaySlot) {
      return;
    }

    this.trap = focusTrap.createFocusTrap([this.overlay, this.overlaySlot], {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });

    this.updateFocusTrap();
  }

  componentDidUpdate() {
    this.updateFocusTrap();
  }

  disconnectedCallback() {
    if (this.trap) {
      this.trap.deactivate();
    }

    this.host.removeEventListener("keydown", this.keyDownListener);
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
        <div class="map">
          <slot name="map" />
        </div>
        <div
          class="overlay"
          hidden={!this.overlayOpen || !this.overlaySlot}
          ref={(element) => (this.overlay = element!)}
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
