export interface BaseLayer {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface BaseLayerChangeEvent {
  activeBaseLayer: BaseLayer;
}
