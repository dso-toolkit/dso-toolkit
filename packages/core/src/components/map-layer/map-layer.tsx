import { Component, ComponentInterface, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";

import { DsoSlideToggleCustomEvent } from "../../components";
import { SlideToggleActiveEvent } from "../slide-toggle/slide-toggle.interfaces";

import { MapLayerActiveChangeEvent } from "./map-layer.interfaces";

/**
 * @slot - The dso-map-layer-object elements. These should be direct children of the dso-map-layer element.
 */
@Component({
  tag: "dso-map-layer",
  styleUrl: "map-layer.scss",
  shadow: true,
})
export class MapLayer implements ComponentInterface {
  /**
   * The label of the Map Layer.
   */
  @Prop({ reflect: true })
  label!: string | undefined;

  /**
   * A boolean to indicate if the Map Layer is capable of being activated. When `true` a Slide Toggle displays
   * on the right.
   */
  @Prop({ reflect: true })
  activatable = false;

  /**
   * An optional boolean indicating whether the Map Layer is active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when user activates or deactivates the Map Layer.
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
      <Fragment>
        <div class="map-layer">
          <span class="map-layer-label">{this.label}</span>
          {this.activatable && (
            <div class="slide-toggle-container">
              <dso-slide-toggle
                accessibleLabel="Toon op kaart"
                checked={this.active}
                onDsoActiveChange={this.handleActiveChange}
              />
            </div>
          )}
        </div>
        <slot />
      </Fragment>
    );
  }
}
