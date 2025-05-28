import { Component, Element, Event, EventEmitter, Fragment, Method, Prop, State, Watch, h } from "@stencil/core";

import { i18n } from "../../utils/i18n";

import { translations } from "./map-controls.i18n";
import { MapControlsToggleEvent } from "./map-controls.interfaces";

// Sync with $transition-duration in ./map-controls.scss
const transitionDuration = 300;

@Component({
  tag: "dso-map-controls",
  styleUrl: "./map-controls.scss",
  shadow: true,
})
export class MapControls {
  @Element()
  host!: HTMLDsoMapControlsElement;

  /**
   * To show and hide the Map Controls.
   */
  @Prop({ reflect: true, mutable: true })
  open = false;

  /**
   * To disable the zoom controls:
   *
   * * `in`: Disable zoom in button.
   * * `out`: Disable zoom out button.
   * * `both`: Disable zoom in and zoom out.
   */
  @Prop()
  disableZoom?: "in" | "out" | "both";

  /**
   * Emitted when the user activates the zoom in button.
   */
  @Event()
  dsoZoomIn!: EventEmitter<MouseEvent>;

  /**
   * Emitted when the user activates the zoom out button.
   */
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

  /**
   * Emitted when the visibility is toggled.
   *
   * Can be used to recalculate map widths or reposition center when the Map Controls opens or closes.
   * @param e
   */
  @Method()
  async toggleVisibility(e: MouseEvent | KeyboardEvent) {
    this.open = !this.open;

    this.dsoToggle.emit({
      originalEvent: e,
      open: this.open,
    });
  }

  private text = i18n(() => this.host, translations);

  #closeButtonElement: HTMLButtonElement | undefined;
  #toggleButtonElement: HTMLButtonElement | undefined;

  render() {
    return (
      <>
        <button
          type="button"
          id="toggle-visibility-button"
          class="toggle-visibility-button"
          onClick={(e) => this.toggleVisibility(e)}
          ref={(element) => (this.#toggleButtonElement = element)}
        >
          <dso-icon icon="layers"></dso-icon>
          <span>{this.text("layersButton")}</span>
        </button>
        <div class="zoom-buttons">
          <button
            type="button"
            onClick={(e) => this.dsoZoomIn.emit(e)}
            disabled={this.disableZoom === "in" || this.disableZoom === "both"}
          >
            <span>{this.text("zoomIn")}</span>
            <dso-icon icon="plus"></dso-icon>
          </button>
          <button
            type="button"
            onClick={(e) => this.dsoZoomOut.emit(e)}
            disabled={this.disableZoom === "out" || this.disableZoom === "both"}
          >
            <span>{this.text("zoomOut")}</span>
            <dso-icon icon="minus"></dso-icon>
          </button>
        </div>
        <section hidden={this.hideContent}>
          <header>
            <h2>{this.text("title")}</h2>
            <button
              type="button"
              class="close-button"
              onClick={(e) => this.toggleVisibility(e)}
              ref={(element) => (this.#closeButtonElement = element)}
            >
              <span>{this.text("hidePanel", { title: this.text("title") })}</span>
              <dso-icon icon="times"></dso-icon>
            </button>
          </header>
          <dso-scrollable>
            <div class="content">
              <slot></slot>
            </div>
          </dso-scrollable>
        </section>
      </>
    );
  }
}
