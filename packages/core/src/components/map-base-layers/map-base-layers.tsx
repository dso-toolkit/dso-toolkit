import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

export interface BaseLayer {
  id: string;
  label: string;
}

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
            <div class="dso-selectable" key={baseLayer.id}>
              <input
                type="radio"
                name="dso-map-base-layers"
                value={baseLayer.id}
                id={`dso-map-base-layer-${baseLayer.id}`}
                checked={!this.selectedBaseLayer && i === 0 || this.selectedBaseLayer === baseLayer}
                onInput={() => this.selectBaseLayer(baseLayer)}
              />
              <label htmlFor={`dso-map-base-layer-${baseLayer.id}`}>
                {baseLayer.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    );
  }
}
