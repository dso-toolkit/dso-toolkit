export interface BaseLayer {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;
  info?: string;
}

export interface BaseLayerChangeEvent {
  activeBaseLayer: BaseLayer;
}
