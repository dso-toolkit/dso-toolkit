import { Component, h, Host, Prop, Event, EventEmitter, State, Watch, Method } from "@stencil/core";
import { MapControlsToggleEvent, transitionDuration } from "./map-controls.interfaces";

@Component({
  tag: "dso-map-controls",
  styleUrl: "./map-controls.scss",
  shadow: true,
})
export class MapControls {
  private panelTitle = "Kaartlagen";

  @Prop({ reflect: true, mutable: true })
  open = false;

  @Prop()
  disableZoom?: "in" | "out" | "both";

  @Event()
  dsoZoomIn!: EventEmitter<MouseEvent>;

  @Event()
  dsoZoomOut!: EventEmitter<MouseEvent>;

  /**
   * emits when the panel opens or closes.
   *
   * - `event.detail.originalEvent` contains the original `MouseEvent / KeyboardEvent` when the panel is toggled by clicking the visibility button or the close button.
   * - `event.detail.open` is true when the panel opens and false when the panel closes.
   */
  @Event()
  dsoToggle!: EventEmitter<MapControlsToggleEvent>;

  @State()
  hideContent = !this.open;

  @Watch("open")
  watchOpen(open: boolean) {
    if (open) {
      this.hideContent = false;

      setTimeout(() => this.#closeButtonElement?.focus(), transitionDuration);
    } else {
      setTimeout(() => {
        this.hideContent = true;

        this.#toggleButtonElement?.focus();
      }, transitionDuration);
    }
  }

  @Method()
  async toggleVisibility(e: MouseEvent | KeyboardEvent) {
    this.open = !this.open;

    this.dsoToggle.emit({
      originalEvent: e,
      open: this.open,
    });
  }

  #closeButtonElement: HTMLButtonElement | undefined;
  #toggleButtonElement: HTMLButtonElement | undefined;

  render() {
    return (
      <Host>
        <button
          type="button"
          id="toggle-visibility-button"
          class="toggle-visibility-button"
          onClick={(e) => this.toggleVisibility(e)}
          ref={(element) => (this.#toggleButtonElement = element)}
        >
          <dso-icon icon="layers"></dso-icon>
          <span>Kaartlagen</span>
        </button>
        <div class="zoom-buttons">
          <button
            type="button"
            onClick={(e) => this.dsoZoomIn.emit(e)}
            disabled={this.disableZoom === "in" || this.disableZoom === "both"}
          >
            <span>Zoom in</span>
            <dso-icon icon="plus"></dso-icon>
          </button>
          <button
            type="button"
            onClick={(e) => this.dsoZoomOut.emit(e)}
            disabled={this.disableZoom === "out" || this.disableZoom === "both"}
          >
            <span>Zoom uit</span>
            <dso-icon icon="minus"></dso-icon>
          </button>
        </div>
        <section hidden={this.hideContent}>
          <header>
            <h2>{this.panelTitle}</h2>
            <button
              type="button"
              class="close-button"
              onClick={(e) => this.toggleVisibility(e)}
              ref={(element) => (this.#closeButtonElement = element)}
            >
              <span>Verberg paneel {this.panelTitle}</span>
              <dso-icon icon="times"></dso-icon>
            </button>
          </header>
          <dso-scrollable>
            <div class="content">
              <slot></slot>
            </div>
          </dso-scrollable>
        </section>
      </Host>
    );
  }
}
