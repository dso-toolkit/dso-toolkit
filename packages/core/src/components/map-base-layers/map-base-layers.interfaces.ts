export interface BaseLayer {
  id: number;
  name: string;
}

export type SelectedBaseLayerChangeEvent = CustomEvent<BaseLayer>;
