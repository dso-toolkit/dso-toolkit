import { Component, ComponentInterface, Event, EventEmitter, Prop, h } from "@stencil/core";

import { DsoSlideToggleCustomEvent } from "../../components";
import { WrapWijzigactie } from "../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";
import { SlideToggleActiveEvent } from "../slide-toggle/slide-toggle.interfaces";

import { MapLayerActiveChangeEvent, MapLayerWijzigactie } from "./map-layer.interfaces";

/**
 * @slot - The dso-map-layer-object elements. These should be direct children of the dso-map-layer element.
 * @slot name - The name of the Map Layer.
 * @slot label - An optional slot for badges or labels next to the Map Layer name.
 */
@Component({
  tag: "dso-map-layer",
  styleUrl: "map-layer.scss",
  shadow: true,
})
export class MapLayer implements ComponentInterface {
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
   * An optional 'wijzigactie' that signals if the Map Layer is added or removed.
   */
  @Prop({ reflect: true })
  wijzigactie!: MapLayerWijzigactie | undefined;

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
      <WrapWijzigactie wijzigactie={this.wijzigactie}>
        <div class="map-layer">
          <div class="map-layer-heading">
            <slot name="name" />
            <slot name="label" />
          </div>
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
      </WrapWijzigactie>
    );
  }
}
