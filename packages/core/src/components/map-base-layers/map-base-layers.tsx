import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import { BaseLayer } from './map-base-layers.interfaces';

@Component({
  tag: 'dso-map-base-layers',
  styleUrl: './map-base-layers.scss',
  shadow: true
})
export class MapBaseLayers {
  @Event()
  baseLayerChange!: EventEmitter<BaseLayer>;

  @Prop()
  baseLayers!: BaseLayer[];

  @Prop({ mutable: true })
  selectedBaseLayer: BaseLayer | undefined;

  selectBaseLayer(baseLayer: BaseLayer): void {
    this.selectedBaseLayer = baseLayer;

    this.baseLayerChange.emit(baseLayer);
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
          {this.baseLayers.map((baseLayer, i) => (
            <dso-selectable
              key={baseLayer.id}
              type="radio"
              value={baseLayer.name}
              checked={!this.selectedBaseLayer && i === 0 || this.selectedBaseLayer === baseLayer}
              onDsoChange={() => this.selectBaseLayer(baseLayer)}
            >
              {baseLayer.name}
            </dso-selectable>
          ))}
        </div>
      </fieldset>
    );
  }
}
