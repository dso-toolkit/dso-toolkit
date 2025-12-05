import { Component, ComponentInterface, Event, EventEmitter, Host, Prop, h } from "@stencil/core";

import { DsoSlideToggleCustomEvent, MapLayerActiveChangeEvent } from "../../../components";
import { SlideToggleActiveEvent } from "../../slide-toggle/slide-toggle.interfaces";

/**
 * @slot - The label for this Map Layer Object
 * @slot symbol - An optional slot to place a symbol in, representing the Map Layer Object.
 */
@Component({
  tag: "dso-map-layer-object",
  styleUrl: "map-layer-object.scss",
  shadow: true,
})
export class MapLayerObject implements ComponentInterface {
  /**
   * An optional boolean indicating whether the Map Layer Object is active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when user activates or deactivates the Map Layer Object.
   */
  @Event()
  dsoActiveChange!: EventEmitter<MapLayerActiveChangeEvent>;

  private handleActiveChange = (event: DsoSlideToggleCustomEvent<SlideToggleActiveEvent>) => {
    this.dsoActiveChange.emit({
      current: Boolean(this.active),
      next: !this.active,
      originalEvent: event,
    });
  };

  render() {
    return (
      <Host>
        <div class="map-layer-object">
          <slot name="symbol" />
          <slot />
          <div class="slide-toggle-container">
            <dso-slide-toggle
              accessibleLabel="Toon op kaart"
              checked={this.active}
              onDsoActiveChange={this.handleActiveChange}
            />
          </div>
        </div>
      </Host>
    );
  }
}
