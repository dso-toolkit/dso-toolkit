import { Component, h, Host, Prop, Event, EventEmitter, State, Watch } from "@stencil/core";

const transitionDuration = 300; // Sync with $transition-duration in ./map-controls.scss

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

  #closeButtonElement: HTMLButtonElement | undefined;
  #toggleButtonElement: HTMLButtonElement | undefined;

  render() {
    return (
      <Host>
        <button
          type="button"
          id="toggle-visibility-button"
          class="toggle-visibility-button"
          onClick={() => (this.open = !this.open)}
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
              onClick={() => (this.open = false)}
              ref={(element) => (this.#closeButtonElement = element)}
            >
              <span>Verberg paneel {this.panelTitle}</span>
              <dso-icon icon="times"></dso-icon>
            </button>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </section>
      </Host>
    );
  }
}
