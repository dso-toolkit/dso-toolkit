import { Component, Element, Event, EventEmitter, Host, Method, Prop, h } from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import {
  ButtonLabelMode,
  DisableZoom,
  MapControlsToggleEvent,
  isDsoMapControlsButtonComponent,
} from "./map-controls-buttons.interfaces";

const mapButtonsResizeObserver = new ResizeObserver(
  debounce(([entry]) => {
    const mql = window.matchMedia("(max-width: 479.99px)");

    if (mql.matches && entry) {
      const mapControlsButtons = entry.target;
      const mapButtonsWidth = entry?.contentRect.width;

      if (mapButtonsWidth && mapControlsButtons && isDsoMapControlsButtonComponent(mapControlsButtons)) {
        mapControlsButtons.setMapButtonsWidth(mapButtonsWidth);
      }
    }
  }, 50)
);

@Component({
  tag: "dso-map-controls-buttons",
  styleUrl: "./map-controls-buttons.scss",
  shadow: true,
})
export class MapControls {
  /**
   * To link the Map Controls Toggle Button with `aria-controls` to a different element, most likely an Map Controls Panel.
   */
  @Prop()
  identifier!: string | undefined;

  /**
   * To show and hide the Map Controls.
   */
  @Prop({ reflect: true })
  open = false;

  /**
   * To disable the zoom controls:
   *
   * * `in`: Disable zoom in button.
   * * `out`: Disable zoom out button.
   * * `both`: Disable zoom in and zoom out.
   */
  @Prop()
  disableZoom?: DisableZoom;

  /**
   * Text shown on the panel toggle button.
   */
  @Prop()
  buttonLabel = "Kaartlagen";

  /**
   * When 'hidden', the button label will not be shown on large viewport.
   */
  @Prop()
  buttonLabelMode: ButtonLabelMode = "responsive";

  /**
   * To enable native map layers
   */
  @Prop()
  enableMapLayers = true;

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

  /**
   * @internal
   */
  @Method()
  async setMapButtonsWidth(width: number) {
    this.mapButtons?.style.setProperty("--map-buttons-width", `${width / 2}px`);
  }

  @Element()
  private mapButtons?: HTMLDsoMapControlsButtonsElement;

  private toggleVisibility(e: MouseEvent | KeyboardEvent, open: boolean) {
    this.dsoToggle.emit({
      originalEvent: e,
      open,
    });
  }

  componentDidLoad() {
    if (this.mapButtons) {
      mapButtonsResizeObserver.observe(this.mapButtons);
    }
  }

  render() {
    return (
      <Host>
        {this.enableMapLayers && (
          <button
            type="button"
            id="toggle-visibility-button"
            class={clsx("dso-toggle-visibility-button", { "dso-label-hidden": this.buttonLabelMode === "hidden" })}
            aria-controls={this.identifier}
            onClick={(e) => this.toggleVisibility(e, !this.open)}
          >
            <dso-icon icon="layers"></dso-icon>
            <span>{this.buttonLabel}</span>
          </button>
        )}
        <div class="dso-zoom-buttons">
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
        <div class="dso-custom-buttons">
          <slot />
        </div>
      </Host>
    );
  }
}
