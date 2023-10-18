import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from "@stencil/core";

import { MapControlsPanelCloseEvent, MapControlsPanelMode } from "./map-controls-panel.interfaces";
import { isDsoMapControlsButtonComponent } from "../map-controls-buttons/map-controls-buttons.interfaces";

// Sync with $transition-duration in ./map-controls.scss
const transitionDuration = 300;

@Component({
  tag: "dso-map-controls-panel",
  styleUrl: "./map-controls-panel.scss",
  shadow: true,
})
export class MapControlsPanel {
  /**
   * How the panel is presented.
   *
   *  * `sidebar`: Panel is presented as sidebar.
   *  * `floating`: Panel is presented as modal.
   */
  @Prop({ reflect: true })
  mode: MapControlsPanelMode = "sidebar";

  /**
   * To show and hide the Map Controls Panel.
   */
  @Prop({ reflect: true })
  open = false;

  /**
   * Text shown in the header of the panel.
   */
  @Prop()
  panelTitle = "Kaartlagen";

  /**
   * This event is emitted when the user activates the close button.
   */
  @Event({ bubbles: false })
  dsoClose!: EventEmitter<MapControlsPanelCloseEvent>;

  @State()
  hideContent = !this.open && this.mode === "sidebar";

  private closeHandler = (e: MouseEvent) => {
    this.dsoClose.emit({ originalEvent: e });
  };

  @Watch("open")
  watchOpen(open: boolean) {
    if (open) {
      this.hideContent = false;

      this.controlsPanel?.show();

      if (this.mode === "sidebar") {
        this.mapControlsButtons?.style.setProperty("transform", "translateX(-300px)");
      }
    } else {
      if (this.mode === "sidebar") {
        this.mapControlsButtons?.style.removeProperty("transform");

        setTimeout(() => {
          this.hideContent = true;

          this.controlsPanel?.close();
        }, transitionDuration);
      } else {
        this.controlsPanel?.close();
      }
    }
  }

  @Element()
  private host?: HTMLDsoMapControlsPanelElement;

  private mapControlsButtons?: HTMLDsoMapControlsButtonsElement;

  private controlsPanel?: HTMLDialogElement;

  componentDidLoad() {
    const mapControlsButtons = this.host?.previousElementSibling;

    if (mapControlsButtons && isDsoMapControlsButtonComponent(mapControlsButtons)) {
      this.mapControlsButtons = mapControlsButtons;
    }

    if (this.open) {
      this.controlsPanel?.show();

      if (this.mode === "sidebar") {
        this.mapControlsButtons?.style.setProperty("transform", "translateX(-300px)");
      }
    }
  }

  render() {
    return (
      <dialog hidden={this.hideContent} ref={(element) => (this.controlsPanel = element)}>
        <header>
          <h2>{this.panelTitle}</h2>
          <button type="button" class="dso-close-button" onClick={this.closeHandler}>
            <span>Verberg paneel {this.panelTitle}</span>
            <dso-icon icon="times"></dso-icon>
          </button>
        </header>
        <dso-scrollable>
          <div class="dso-layer-content">
            <slot></slot>
          </div>
        </dso-scrollable>
      </dialog>
    );
  }
}
