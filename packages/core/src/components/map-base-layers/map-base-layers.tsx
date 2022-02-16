import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import { BaseLayer, BaseLayerChangeEvent } from './map-base-layers.interfaces';

@Component({
  tag: 'dso-map-base-layers',
  styleUrl: './map-base-layers.scss',
  shadow: true
})
export class MapBaseLayers {
  @Event()
  baseLayerChange!: EventEmitter<BaseLayerChangeEvent>;

  @Prop()
  baseLayers!: BaseLayer[];

  baseLayerChangeHandler(baseLayer: BaseLayer): void {
    this.baseLayerChange.emit({ activeBaseLayer: baseLayer });
  }

  render() {
    return (
      <fieldset class="form-group dso-radios">
        <legend class="sr-only">Achtergrond</legend>
        <div class="dso-label-container">
          <span class="control-label" aria-hidden="true">
            Achtergrond
          </span>
        </div>
        <div class="dso-field-container">
          {this.baseLayers.map(baseLayer => (
            <dso-selectable
              key={baseLayer.id}
              type="radio"
              value={baseLayer.name}
              checked={baseLayer.checked}
              onDsoChange={() => this.baseLayerChangeHandler(baseLayer)}
            >
              {baseLayer.name}
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
