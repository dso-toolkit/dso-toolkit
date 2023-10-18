import { Component, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";
import { v4 } from "uuid";

import { ButtonLabelMode, DisableZoom, MapControlsToggleEvent } from "./map-controls.interfaces";

@Component({
  tag: "dso-map-controls",
  shadow: true,
})
export class MapControls {
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
   * Text shown in the header of the panel.
   */
  @Prop()
  panelTitle = "Kaartlagen";

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

  private identifier = v4();

  private toggleVisibility(e: MouseEvent | KeyboardEvent, open: boolean) {
    this.dsoToggle.emit({
      originalEvent: e,
      open,
    });
  }

  render() {
    return (
      <Fragment>
        <dso-map-controls-buttons
          identifier={this.identifier}
          open={this.open}
          disableZoom={this.disableZoom}
          buttonLabel={this.buttonLabel}
          buttonLabelMode={this.buttonLabelMode}
          enableMapLayers={this.enableMapLayers}
          onDsoZoomIn={(e) => {
            e?.stopImmediatePropagation();
            this.dsoZoomIn.emit(e.detail);
          }}
          onDsoZoomOut={(e) => {
            e?.stopImmediatePropagation();
            this.dsoZoomOut.emit(e.detail);
          }}
          onDsoToggle={(e) => {
            e?.stopImmediatePropagation();
            this.dsoToggle.emit(e.detail);
          }}
        >
          <slot name="custom-buttons" />
        </dso-map-controls-buttons>
        <dso-map-controls-panel
          id={this.identifier}
          mode="sidebar"
          open={this.open}
          panelTitle={this.panelTitle}
          onDsoClose={(e) => this.toggleVisibility(e.detail.originalEvent, false)}
        >
          <slot></slot>
        </dso-map-controls-panel>
      </Fragment>
    );
  }
}
