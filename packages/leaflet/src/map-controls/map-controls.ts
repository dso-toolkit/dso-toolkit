import { SelectedBaseLayerChangeEvent, CheckedOverlaysChangeEvent, Overlay } from '@dso-toolkit/core';
import * as L from 'leaflet';
import { render, html, TemplateResult, nothing } from 'lit-html';

export interface LayerObject {
  name: string;
  layer: L.Layer;
}

export enum LayerType {
  BaseLayer = 'BASE_LAYER',
  Overlay = 'OVERLAY'
}

export interface MapControlsOptions {
}

export class MapControls {
  private state: State;

  private container?: HTMLDivElement;

  private map?: L.Map;

  private lastLayerId = 0;

  /**
   * Create a DSO Map Controls to manage layers and zoom level.
   * @param baseLayers The base layers to manage
   * @param overlays The overlays to manage
   */
  constructor(baseLayers?: LayerObject[], overlays?: LayerObject[], options?: MapControlsOptions) {
    this.state = {
      layers: [
        ...baseLayers?.map(l => ({ ...l, type: LayerType.BaseLayer, id: ++this.lastLayerId })) ?? [],
        ...overlays?.map(l => ({ ...l, type: LayerType.Overlay, id: ++this.lastLayerId})) ?? []
      ],
      disableZoom: undefined
    };
  }

  /**
   * Get the container on which MapControls is mounted
   * @returns container
   */
  getContainer() {
    return this.container;
  }

  /**
   * Adds the DSO Map Controls to the Leaflet instance
   * @param map Leaflet map instance
   * @returns The DSO Map Controls instance
   */
  addTo(map: L.Map) {
    this.remove();
    this.map = map;

    this.container = L.DomUtil.create('div', 'dso-leaflet-controls') as HTMLDivElement;

    L.DomEvent.disableClickPropagation(this.container);

    this.render();

    this.map.getContainer().appendChild(this.container);
    this.map.on('zoomend zoomlevelschange', this.updateZoomDisabled, this);
    this.map.on('unload', this.remove, this);

    this.updateZoomDisabled();

    return this;
  }

  // @method remove: this
  // Removes the control from the map it is currently active on.
  /**
   * Removes the DSO Map Controls and the layers it manages from the map it is currently active on.
   * @returns The DSO Map Controls instance
   */
  remove() {
    if (this.container) {
      L.DomUtil.remove(this.container);
    }

    for (const { layer } of this.state.layers) {
      this.removeLayerFromMap(layer);
    }

    if (this.map) {
      this.map.off('unload', this.remove, this);
      this.map.off('zoomend zoomlevelschange', this.updateZoomDisabled, this);
      this.map = undefined;
    }

    return this;
  }

  /**
   * Adds a base layer to the DSO Map Controls.
   * 
   * Note: This method does **not activate** the base layer.
   * @param layer The Leaflet Layer to add to the control
   * @param name The name of the Leaflet Layer.
   * @returns The DSO Map Controls instance
   */
  addBaseLayer(layer: L.Layer, name: string) {
    this.addLayer(layer, name, LayerType.BaseLayer);

    return this;
  }

  /**
   * Adds an overlay to the DSO Map Controls.
   * 
   * Note: This method does **not activate** the overlay.
   * @param layer The Leaflet Layer to add to the control
   * @param name The name of the Leaflet Layer.
   * @returns The DSO Map Controls instance
   */
  addOverlay(layer: L.Layer, name: string) {
    this.addLayer(layer, name, LayerType.Overlay);

    return this;
  }

  /**
   * Remove the given layer from the DSO Map Controls.
   * 
   * Note: This also removes the layer from the Leaflet Map instance.
   * @param layer The Leaflet Layer to remove.
   * @returns The DSO Map Controls instance.
   */
  removeLayer(layer: L.Layer) {
    const meta = this.state.layers.find(l => l.layer === layer);
    if (!meta) {
      return;
    }

    this.update({
      layers: this.state.layers.filter(l => l.layer !== layer)
    });

    if (this.map) {
      layer.off('add remove', this.onLayerChange, this);

      if (meta.type === LayerType.BaseLayer && this.map.hasLayer(layer)) {
        this.removeLayerFromMap(layer);

        const nextBaseLayer = this.state.layers.find(l => l.type === LayerType.BaseLayer);
        if (nextBaseLayer) {
          this.addLayerToMap(nextBaseLayer.layer);
        }
      }
      else {
        this.removeLayerFromMap(layer);
      }
    }

    return this;
  }

  private addLayer(layer: L.Layer, name: string, type: LayerType) {
    if (this.state.layers.some(l => l.layer === layer)) {
      return;
    }

    this.update({
      layers: [...this.state.layers, { id: ++this.lastLayerId, name: name, layer, type }]
    });

    if (this.map) {
      layer.on('add remove', this.onLayerChange, this);

      if (
        this.state.layers.filter(l => l.type === LayerType.BaseLayer).length === 1 &&
        !this.map.hasLayer(layer) &&
        type === LayerType.BaseLayer
      ) {
        this.addLayerToMap(layer);
      }
    }
  }

  private addLayerToMap(layer: L.Layer) {
    if (!this.map) {
      return;
    }

    this.map.addLayer(layer);
  }

  private removeLayerFromMap(layer: L.Layer) {
    if (!this.map) {
      return;
    }

    this.map.removeLayer(layer);
  }

  private onLayerChange(e: L.LeafletEvent) {
    if (!this.map) {
      throw new Error('onBaseLayerChange event without map');
    }

    const item = this.state.layers.find(l => l.layer === e.target);
    if (!item) {
      console.error(e.target);
      throw new Error('Layer not found');
    }

    let type: 'baselayerchange' | 'overlayadd' | 'overlayremove' | null;

    if (item.type === LayerType.BaseLayer) {
      type = e.type === 'add' ? 'baselayerchange' : null;
    }
    else {
      type = e.type === 'add' ? 'overlayadd' : 'overlayremove';
    }

    if (type) {
      this.map.fire(type, e.target);
    }
  }

  private handleBaselayerChange(id: number) {
    if (!this.map) {
      return;
    }

    const layer = this.state.layers.find(l => l.id === id);
    if (!layer) {
      throw new Error('Trying to add non-existing layer');
    }

    for (const layer of this.state.layers) {
      if (layer.id !== id && this.map.hasLayer(layer.layer) && layer.type === LayerType.BaseLayer) {
        this.removeLayerFromMap(layer.layer);
      }
    }

    this.addLayerToMap(layer.layer);
  }

  private handleOverlaysChange(checkedOverlays: Overlay[]) {
    if (!this.map) {
      return;
    }

    for (const layer of this.state.layers) {
      if (checkedOverlays.includes(layer) && !this.map.hasLayer(layer.layer) && layer.type === LayerType.Overlay) {
        this.addLayerToMap(layer.layer);
      }
      else if (!checkedOverlays.includes(layer) && this.map.hasLayer(layer.layer) && layer.type === LayerType.Overlay) {
        this.removeLayerFromMap(layer.layer);
      }
    }
  }

  private zoomIn(e: PointerEvent): void {
    if (!this.map) {
      return;
    }

    if (this.map.getZoom() < this.map.getMaxZoom()) {
      this.map.zoomIn(this.map.options.zoomDelta ?? 1 * (e.shiftKey ? 3 : 1));
    }
  }

  private zoomOut(e: PointerEvent): void {
    if (!this.map) {
      return;
    }

    if (this.map.getZoom() > this.map.getMinZoom()) {
      this.map.zoomOut(this.map.options.zoomDelta ?? 1 * (e.shiftKey ? 3 : 1));
    }
  }

  private updateZoomDisabled() {
    if (!this.map) {
      return;
    }

    if (this.state.disableZoom !== 'in' && this.map.getZoom() >= this.map.getMaxZoom()) {
      this.update({ ...this.state, disableZoom: 'in' });
    }
    else if (this.state.disableZoom !== 'out' && this.map.getZoom() <= this.map.getMinZoom()) {
      this.update({ ...this.state, disableZoom: 'out' });
    }
    else if (this.state.disableZoom !== undefined) {
      this.update({ ...this.state, disableZoom: undefined });
    }
  }

  private filterLayersByTypeAndSort(type: LayerType) {
    return this.state.layers
      .filter(l => l.type === type)
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  private update(changedState: Partial<State>): void { // not sure if changedState should be optional
    this.state = { ...this.state, ...changedState };

    this.render();
  }

  private render() {
    if (!this.container) {
      throw new Error('update() needs a container');
    }

    render(this.template(), this.container);
  }

  private template(): TemplateResult {
    const baseLayers = this.filterLayersByTypeAndSort(LayerType.BaseLayer);
    const overlays = this.filterLayersByTypeAndSort(LayerType.Overlay);

    const selectedBaseLayer = baseLayers.find(b => this.map?.hasLayer(b.layer));
    const checkedOverlays = overlays.filter(o => this.map?.hasLayer(o.layer));

    return html`
      <dso-map-controls
        @zoomIn=${(e: CustomEvent<PointerEvent>) => this.zoomIn(e.detail)}
        @zoomOut=${(e: CustomEvent<PointerEvent>) => this.zoomOut(e.detail)}
        .disableZoom=${this.state.disableZoom}
      >
        <form>
          ${baseLayers.length > 0
            ? html`
              <dso-map-base-layers
                .baseLayers=${baseLayers}
                .selectedBaseLayer=${selectedBaseLayer}
                @baseLayerChange=${(e: SelectedBaseLayerChangeEvent) => this.handleBaselayerChange(e.detail.id)}
              ></dso-map-base-layers>
            `
            : nothing
          }
          ${overlays.length > 0
            ? html`
              <dso-map-overlays
                .overlays=${overlays}
                .checkedOverlays=${checkedOverlays}
                @checkedOverlaysChange=${(e: CheckedOverlaysChangeEvent) => this.handleOverlaysChange(e.detail)}
              ></dso-map-overlays>
            `
            : nothing
          }
          </form>
      </dso-map-controls>
    `;
  }
}

interface ControlledLayer {
  id: number;
  name: string;
  layer: L.Layer;
  type: LayerType
}

interface State {
  layers: ControlledLayer[];
  disableZoom: 'both' | 'in' | 'out' | undefined;
}
