import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Method,
  Prop,
  State,
  Watch,
  h,
} from "@stencil/core";

import { i18n } from "../../utils/i18n";

import { translations } from "./map-controls.i18n";
import { MapControlsToggleEvent } from "./map-controls.interfaces";

// Sync with $transition-duration in ./map-controls.scss and map-controls.cy.ts
const transitionDuration = 300;

@Component({
  tag: "dso-map-controls",
  styleUrl: "./map-controls.scss",
  shadow: true,
})
export class MapControls implements ComponentInterface {
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

        if (this.#toggleButtonElement?.checkVisibility()) {
          this.#toggleButtonElement?.focus();
        }

        if (this.#toggleIconButtonElement?.checkVisibility()) {
          this.#toggleIconButtonElement.focus();
        }
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

  #closeButtonElement: HTMLDsoIconButtonElement | undefined;
  #toggleButtonElement: HTMLButtonElement | undefined;
  #toggleIconButtonElement: HTMLDsoIconButtonElement | undefined;

  render() {
    return (
      <Fragment>
        <dso-icon-button
          label={this.text("layersButton")}
          icon="layers"
          variant="map"
          tooltipPlacement="left"
          class="toggle-visibility-icon-button"
          onDsoClick={(e) => this.toggleVisibility(e.detail.originalEvent)}
          ref={(element) => (this.#toggleIconButtonElement = element)}
        />
        <button
          type="button"
          class="dso-map toggle-visibility-button"
          onClick={(e) => this.toggleVisibility(e)}
          ref={(element) => (this.#toggleButtonElement = element)}
        >
          <dso-icon icon="layers"></dso-icon>
          <span>{this.text("layersButton")}</span>
        </button>
        <dso-button-group class="zoom-buttons" direction="column">
          <dso-icon-button
            label={this.text("zoomIn")}
            icon="plus"
            variant="map"
            tooltipPlacement="left"
            onDsoClick={(e) => this.dsoZoomIn.emit(e.detail.originalEvent)}
            disabled={this.disableZoom === "in" || this.disableZoom === "both"}
          />
          <dso-icon-button
            label={this.text("zoomOut")}
            icon="minus"
            variant="map"
            tooltipPlacement="left"
            onDsoClick={(e) => this.dsoZoomOut.emit(e.detail.originalEvent)}
            disabled={this.disableZoom === "out" || this.disableZoom === "both"}
          />
        </dso-button-group>
        <section hidden={this.hideContent}>
          <header>
            <h2>{this.text("title")}</h2>
            <dso-icon-button
              class="close-button"
              label={this.text("hidePanel", { title: this.text("title") })}
              icon="cross"
              variant="tertiary"
              onDsoClick={(e) => this.toggleVisibility(e.detail.originalEvent)}
              ref={(element) => (this.#closeButtonElement = element)}
            />
          </header>
          <dso-scrollable>
            <div class="content">
              <slot></slot>
            </div>
          </dso-scrollable>
        </section>
      </Fragment>
    );
  }
}
