export interface MapLayer<TemplateFnReturnType> {
  active?: boolean;
  activatable?: boolean;
  dsoActiveChange?: (e: CustomEvent<MapLayerActiveChangeEvent>) => void;
  label: string;
  objects: MapLayerObject<TemplateFnReturnType>[];
}

export interface MapLayerActiveChangeEvent {
  /**
   * The current status of the Map Layer.
   */
  current: boolean;

  /**
   * The next status of the Map Layer.
   */
  next: boolean;

  originalEvent: Event;
}

export interface MapLayerObject<TemplateFnReturnType> {
  label: TemplateFnReturnType;
  dsoActiveChange?: (e: CustomEvent<MapLayerActiveChangeEvent>) => void;
  symboolCode?: string;
  active?: boolean;
}
