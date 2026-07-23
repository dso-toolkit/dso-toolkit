import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Listen,
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
const transitionFallbackDuration = transitionDuration + 50;

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

  @Listen("transitionend")
  handleTransitionEnd(event: TransitionEvent) {
    if (event.target !== this.host || event.propertyName !== "transform") {
      return;
    }

    this.applyPostTransitionState();
  }

  @Watch("open")
  watchOpen(open: boolean) {
    this.clearPostTransitionTimeout();

    if (open) {
      this.hideContent = false;
    } else {
      this.hideContent = false;
    }

    this.#postTransitionTimeout = window.setTimeout(() => this.applyPostTransitionState(), transitionFallbackDuration);
  }

  /**
   * Emitted when the visibility is toggled.
   *
   * Can be used to recalculate map widths or reposition center when the Map Controls opens or closes.
   * @param e
   */
  @Method()
  async toggleVisibility(e: MouseEvent | KeyboardEvent) {
    this.toggleVisibilityInternal(e);
  }

  private toggleVisibilityInternal(
    e: MouseEvent | KeyboardEvent,
    returnFocusTarget?: HTMLButtonElement | HTMLDsoIconButtonElement,
  ) {
    if (!this.open && returnFocusTarget) {
      this.#returnFocusTarget = returnFocusTarget;
    }

    this.open = !this.open;

    this.dsoToggle.emit({
      originalEvent: e,
      open: this.open,
    });
  }

  private text = i18n(() => this.host, translations);

  #toggleButtonElement: HTMLButtonElement | undefined;
  #toggleIconButtonElement: HTMLDsoIconButtonElement | undefined;
  #closeIconButtonElement: HTMLDsoIconButtonElement | undefined;
  #postTransitionTimeout: number | undefined;
  #returnFocusTarget: HTMLButtonElement | HTMLDsoIconButtonElement | undefined;
  #mapLayersPanelId = "map-layers-panel";
  #mapLayersTitleId = "map-layers-title";

  private clearPostTransitionTimeout() {
    if (this.#postTransitionTimeout) {
      clearTimeout(this.#postTransitionTimeout);
      this.#postTransitionTimeout = undefined;
    }
  }

  private applyPostTransitionState() {
    this.clearPostTransitionTimeout();

    if (this.open) {
      this.#closeIconButtonElement?.setFocus();
      return;
    }

    this.hideContent = true;

    if (this.#returnFocusTarget === this.#toggleIconButtonElement) {
      this.#toggleIconButtonElement?.setFocus();
    } else {
      this.#toggleButtonElement?.focus();
    }
  }

  private handlePanelKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.open) {
      event.stopPropagation();
      void this.toggleVisibility(event);
    }
  };

  disconnectedCallback() {
    this.clearPostTransitionTimeout();
  }

  render() {
    return (
      <Fragment>
        <dso-icon-button
          expanded={this.open}
          label={this.text("layersButton")}
          icon="layers"
          variant="map"
          aria-controls={this.#mapLayersPanelId}
          tooltipPlacement="left"
          class="toggle-visibility-icon-button"
          onDsoClick={(e) => this.toggleVisibilityInternal(e.detail.originalEvent, this.#toggleIconButtonElement)}
          ref={(element) => (this.#toggleIconButtonElement = element)}
        />
        <button
          type="button"
          class="dso-map toggle-visibility-button"
          aria-controls={this.#mapLayersPanelId}
          aria-expanded={this.open ? "true" : "false"}
          onClick={(e) => this.toggleVisibilityInternal(e, this.#toggleButtonElement)}
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
        <section
          id={this.#mapLayersPanelId}
          hidden={this.hideContent}
          role="region"
          onKeyDown={this.handlePanelKeyDown}
          aria-labelledby={this.#mapLayersPanelId}
        >
          <header>
            <h2 id={this.#mapLayersTitleId} tabIndex={-1}>
              {this.text("title")}
            </h2>
            <dso-icon-button
              class="close-button"
              label={this.text("hidePanel", { title: this.text("title") })}
              icon="cross"
              variant="tertiary"
              onDsoClick={(e) => this.toggleVisibility(e.detail.originalEvent)}
              ref={(element) => (this.#closeIconButtonElement = element)}
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
