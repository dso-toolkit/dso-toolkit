import { Component, ComponentInterface, Event, EventEmitter, Host, Prop, h } from "@stencil/core";

import { DsoSlideToggleCustomEvent } from "../../../components";
import { WrapWijzigactie } from "../../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";
import { SlideToggleActiveEvent } from "../../slide-toggle/slide-toggle.interfaces";
import { MapLayerWijzigactie } from "../map-layer.interfaces";

import { MapLayerObjectActiveChangeEvent } from "./map-layer-object.interfaces";

/**
 * @slot - The label for this Map Layer Object
 * @slot symbol - An optional slot to place a symbol in, representing the Map Layer Object.
 * @slot label - An optional slot for badges or labels next to the object label.
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
   * An optional wijzigactie value for revision indication.
   */
  @Prop({ reflect: true })
  wijzigactie!: MapLayerWijzigactie | undefined;

  /**
   * Emitted when user activates or deactivates the Map Layer Object.
   */
  @Event()
  dsoActiveChange!: EventEmitter<MapLayerObjectActiveChangeEvent>;

  /**
   * Emitted when the mouse enters the Map Layer Object.
   */
  @Event()
  dsoMouseEnter!: EventEmitter;

  /**
   * Emitted when the mouse leaves the Map Layer Object.
   */
  @Event()
  dsoMouseLeave!: EventEmitter;

  private handleActiveChange = (event: DsoSlideToggleCustomEvent<SlideToggleActiveEvent>) => {
    this.dsoActiveChange.emit({
      current: Boolean(this.active),
      next: !this.active,
      originalEvent: event,
    });
  };

  render() {
    return (
      <Host onMouseEnter={() => this.dsoMouseEnter.emit()} onMouseLeave={() => this.dsoMouseLeave.emit()}>
        <WrapWijzigactie wijzigactie={this.wijzigactie}>
          <div class="map-layer-object">
            <div>
              <slot name="symbol" />
            </div>
            <div class="map-layer-object-heading">
              <slot />
              <slot name="label" />
            </div>
            <div class="slide-toggle-container">
              <dso-slide-toggle
                accessibleLabel="Toon op kaart"
                checked={this.active}
                onDsoActiveChange={this.handleActiveChange}
              />
            </div>
          </div>
        </WrapWijzigactie>
      </Host>
    );
  }
}
