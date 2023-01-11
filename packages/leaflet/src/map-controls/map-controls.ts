import { BaseLayer, BaseLayerChangeEvent, Overlay, OverlayChangeEvent } from "@dso-toolkit/core";
import { defineCustomElement as defineCustomElementDsoMapControls } from "@dso-toolkit/core/dist/components/dso-map-controls.js";
import { defineCustomElement as defineCustomElementDsoMapBaseLayers } from "@dso-toolkit/core/dist/components/dso-map-base-layers";
import { defineCustomElement as defineCustomElementDsoMapOverlays } from "@dso-toolkit/core/dist/components/dso-map-overlays";
import * as L from "leaflet";
import { render, html, TemplateResult, nothing } from "lit-html";

const defaultLayerOptions: Readonly<LayerOptions> = {
  disabled: false,
};

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
  constructor(baseLayers?: LayerObject[], overlays?: LayerObject[], _options?: MapControlsOptions) {
    this.state = {
      layers: [
        ...(baseLayers?.map((l) => this.mapToControlledLayer(l, LayerType.BaseLayer)) ?? []),
        ...(overlays?.map((l) => this.mapToControlledLayer(l, LayerType.Overlay)) ?? []),
      ],
      disableZoom: undefined,
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
    this.defineCustomElements();

    this.remove();
    this.map = map;

    this.container = L.DomUtil.create("div", "dso-leaflet-controls") as HTMLDivElement;

    L.DomEvent.disableClickPropagation(this.container);

    this.render();

    this.map.getContainer().appendChild(this.container);
    this.map.on("zoomend zoomlevelschange", this.updateZoomDisabled, this);
    this.map.on("unload", this.remove, this);

    this.updateZoomDisabled();

    return this;
  }

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
      this.map.off("unload", this.remove, this);
      this.map.off("zoomend zoomlevelschange", this.updateZoomDisabled, this);
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
  addBaseLayer(layer: L.Layer, name: string, options?: Partial<LayerOptions>) {
    this.addLayer(layer, name, LayerType.BaseLayer, { ...defaultLayerOptions, ...options });

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
  addOverlay(layer: L.Layer, name: string, options?: Partial<LayerOptions>) {
    this.addLayer(layer, name, LayerType.Overlay, { ...defaultLayerOptions, ...options });

    return this;
  }

  enableLayer(layer: L.Layer) {
    this.update({
      layers: this.state.layers.map((l) => (l.layer === layer ? { ...l, disabled: false } : l)),
    });

    return this;
  }

  disableLayer(layer: L.Layer) {
    this.update({
      layers: this.state.layers.map((l) => (l.layer === layer ? { ...l, disabled: true } : l)),
    });

    return this;
  }

  /**
   * Remove a BaseLayer or Overlay from the DSO Map Controls.
   *
   * Note: This also removes the layer from the Leaflet Map instance.
   * @param layer The Leaflet Layer to remove.
   * @returns The DSO Map Controls instance.
   */
  removeLayer(layer: L.Layer) {
    const meta = this.state.layers.find((l) => l.layer === layer);
    if (!meta) {
      return;
    }

    this.update({
      layers: this.state.layers.filter((l) => l.layer !== layer),
    });

    if (this.map) {
      layer.off("add remove", this.onLayerChange, this);

      if (meta.type === LayerType.BaseLayer && this.map.hasLayer(layer)) {
        this.removeLayerFromMap(layer);

        const nextBaseLayer = this.state.layers.find((l) => l.type === LayerType.BaseLayer);
        if (nextBaseLayer) {
          this.addLayerToMap(nextBaseLayer.layer);
        }
      } else {
        this.removeLayerFromMap(layer);
      }
    }

    return this;
  }

  private addLayer(layer: L.Layer, name: string, type: LayerType, { disabled }: LayerOptions) {
    if (this.state.layers.some((l) => l.layer === layer)) {
      return;
    }

    this.update({
      layers: [
        ...this.state.layers,
        {
          id: ++this.lastLayerId,
          name,
          layer,
          type,
          disabled,
        },
      ],
    });

    if (this.map) {
      layer.on("add remove", this.onLayerChange, this);
    }
  }

  private addLayerToMap(layer: L.Layer) {
    if (!this.map) {
      return;
    }

    this.map.addLayer(layer);
    this.update();
  }

  private removeLayerFromMap(layer: L.Layer) {
    if (!this.map) {
      return;
    }

    this.map.removeLayer(layer);
    this.update();
  }

  private onLayerChange(e: L.LeafletEvent) {
    if (!this.map) {
      throw new Error("onBaseLayerChange event without map");
    }

    const item = this.state.layers.find((l) => l.layer === e.target);
    if (!item) {
      console.error(e.target);
      throw new Error("Layer not found");
    }

    let type: "baselayerchange" | "overlayadd" | "overlayremove" | null;

    if (item.type === LayerType.BaseLayer) {
      type = e.type === "add" ? "baselayerchange" : null;
    } else {
      type = e.type === "add" ? "overlayadd" : "overlayremove";
    }

    if (type) {
      this.map.fire(type, e.target);
    }

    this.update();
  }

  private handleBaselayerChange({ activeBaseLayer }: BaseLayerChangeEvent) {
    if (!this.map) {
      return;
    }

    const layer = this.state.layers.find((l) => l.id === activeBaseLayer.id);
    if (!layer) {
      throw new Error("Trying to add non-existing layer");
    }

    for (const layer of this.state.layers) {
      if (layer.id !== activeBaseLayer.id && this.map.hasLayer(layer.layer) && layer.type === LayerType.BaseLayer) {
        this.removeLayerFromMap(layer.layer);
      }
    }

    this.addLayerToMap(layer.layer);
  }

  private handleToggleOverlay({ checked, overlay }: OverlayChangeEvent) {
    if (!this.map) {
      return;
    }

    const layer = this.state.layers.find(({ id }) => overlay.id === id);
    if (!layer) {
      return;
    }

    if (checked && !this.map.hasLayer(layer.layer)) {
      this.addLayerToMap(layer.layer);
    } else if (!checked && this.map.hasLayer(layer.layer)) {
      this.removeLayerFromMap(layer.layer);
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

    if (this.state.disableZoom !== "in" && this.map.getZoom() >= this.map.getMaxZoom()) {
      this.update({ ...this.state, disableZoom: "in" });
    } else if (this.state.disableZoom !== "out" && this.map.getZoom() <= this.map.getMinZoom()) {
      this.update({ ...this.state, disableZoom: "out" });
    } else if (this.state.disableZoom !== undefined) {
      this.update({ ...this.state, disableZoom: undefined });
    } else {
      this.update();
    }
  }

  private filterLayersByTypeAndSort(type: LayerType) {
    return this.state.layers
      .filter((l) => l.type === type)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ id, name, layer, disabled = false }) => {
        const { available, message } = this.layerAvailability(name, layer);

        return {
          id,
          name,
          checked: available && (this.map?.hasLayer(layer) ?? false),
          disabled: !available || disabled,
          info: message,
        };
      });
  }

  private layerAvailability(name: string, { options }: Layer): { available: boolean; message?: string } {
    if (options?.minZoom === undefined || options?.maxZoom === undefined || this.map === undefined) {
      return {
        available: true,
      };
    }

    const zoom = this.map.getZoom();

    if (options.maxZoom >= zoom && options.minZoom <= zoom) {
      return {
        available: true,
      };
    }

    return {
      available: false,
      message: `Zoom ${options.maxZoom >= zoom ? "in" : "uit"} om "${name}" te bekijken`,
    };
  }

  private mapToControlledLayer(layerObject: LayerObject, layerType: LayerType): ControlledLayer {
    return {
      id: ++this.lastLayerId,
      type: layerType,
      name: layerObject.name,
      layer: layerObject.layer,
      disabled: !!layerObject.disabled,
    };
  }

  private update(changedState?: Partial<State>): void {
    this.state = { ...this.state, ...changedState };

    this.render();
  }

  private render() {
    if (!this.container) {
      throw new Error("update() needs a container");
    }

    render(this.template(), this.container);
  }

  private defineCustomElements() {
    defineCustomElementDsoMapControls();
    defineCustomElementDsoMapBaseLayers();
    defineCustomElementDsoMapOverlays();
  }

  private template(): TemplateResult {
    const baseLayers: BaseLayer[] = this.filterLayersByTypeAndSort(LayerType.BaseLayer);
    const overlays: Overlay[] = this.filterLayersByTypeAndSort(LayerType.Overlay);

    return html`
      <dso-map-controls
        @dsoZoomIn=${(e: CustomEvent<PointerEvent>) => this.zoomIn(e.detail)}
        @dsoZoomOut=${(e: CustomEvent<PointerEvent>) => this.zoomOut(e.detail)}
        .disableZoom=${this.state.disableZoom}
      >
        ${baseLayers.length > 0
          ? html`<dso-map-base-layers
              .baseLayers=${baseLayers}
              @dsoBaseLayerChange=${(e: CustomEvent<BaseLayerChangeEvent>) => this.handleBaselayerChange(e.detail)}
            ></dso-map-base-layers>`
          : nothing}
        ${overlays.length > 0
          ? html`<dso-map-overlays
              .overlays=${overlays}
              @dsoToggleOverlay=${(e: CustomEvent<OverlayChangeEvent>) => this.handleToggleOverlay(e.detail)}
            ></dso-map-overlays>`
          : nothing}
      </dso-map-controls>
    `;
  }
}

export interface LayerObject {
  name: string;
  layer: L.Layer;
  checked?: boolean;
  disabled?: boolean;
}

interface LayerOptions {
  disabled: boolean;
}

export enum LayerType {
  BaseLayer = "BASE_LAYER",
  Overlay = "OVERLAY",
}

export interface MapControlsOptions {}

type Layer = L.Layer & { options?: { minZoom?: number; maxZoom?: number } };

interface ControlledLayer {
  id: number;
  name: string;
  layer: Layer;
  type: LayerType;
  disabled: boolean;
}

interface State {
  layers: ControlledLayer[];
  disableZoom: "both" | "in" | "out" | undefined;
}
