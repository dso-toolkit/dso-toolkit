import * as L from 'leaflet';
import { render, html, TemplateResult } from 'lit-html';

import { LayersPanelOptions } from './layers-panel.options';

export interface State {
  baseLayers: L.Control.LayersObject;
  overlays: L.Control.LayersObject;
}

export interface DsoLayersInstance {
  options: LayersPanelOptions;
  initialize(baseLayers?: L.Control.LayersObject, overlays?: L.Control.LayersObject, options?: Partial<LayersPanelOptions>): void;
  onAdd(map: L.Map): HTMLElement;
  onRemove(): void;
  _setState(state: State): void;
  _template(): TemplateResult;
  _update(): void;
  _zoomIn(e: PointerEvent): void;
  _zoomOut(e: PointerEvent): void;
  _container: unknown | HTMLElement;
  _map: L.Map | undefined;
  _state: State;
}

export const LayersPanelControl = L.Control.extend<DsoLayersInstance>({
  options: {
    position: 'topright'
  },
  initialize(baseLayers, overlays, options) {
    L.Util.setOptions(this, options);

    this.state = {
      baseLayers: baseLayers ?? {},
      overlays: baseLayers ?? {}
    };
  },
  onAdd(map): HTMLElement {
    this._map = map;
    this._container = L.DomUtil.create('div', 'dso-leaflet-controls') as HTMLDivElement;

    L.DomEvent.disableClickPropagation(this._container);

    this._update();

    return this._container;
  },
  onRemove(): void {

  },
  _zoomIn(e): void {
    if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
      this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
    }
  },
  _zoomOut(e: PointerEvent): void {
    if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
      this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
    }
  },
  _setState(state): void {

  },
  _update(): void {
    render(this._template(), this._container);
  },
  _template(): TemplateResult {
    console.log(this.state);
    console.log(Object.keys(this.state.baseLayers).map(l => ({ id: l, label: l })))

    return html`
      <dso-map-controls
        @zoomIn=${(e: CustomEvent<PointerEvent>) => this._zoomIn(e.detail)}
        @zoomOut=${(e: CustomEvent<PointerEvent>) => this._zoomOut(e.detail)}
      >
        <form>
          <div class="rich-content">
            <p>Inhoud</p>
          </div>
          <dso-map-base-layers
            .baseLayers=${Object.keys(this.state.baseLayers).map(l => ({ id: l, label: l }))}
            @baseLayerChange=${(e: CustomEvent) => console.log(e)}
          ></dso-map-base-layers>
          <dso-map-overlays
            .overlays=${Object.keys(this.state.overlays).map(o => ({ id: o, label: o }))}
            @checkedOverlaysChange=${(e: CustomEvent) => console.log(e)}
          ></dso-map-overlays>
          <div class="rich-content">
            <p>Ook nog meer inhoud</p>
          </div>
        </form>
      </dso-map-controls>
    `;
  },
  _state: {} as any,
  _container: undefined,
  _map: undefined
}) as { new(baseLayers?: L.Control.LayersObject, overlays?: L.Control.LayersObject, options?: Partial<LayersPanelOptions>): DsoLayersInstance & L.Control };
