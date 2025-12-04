export interface MapLayer<TemplateFnReturnType> {
  active?: boolean;
  activatable?: boolean;
  dsoActiveChange?: (e: CustomEvent<MapLayerActiveChangeEvent>) => void;
  label: string;
  objects: MapLayerObject<TemplateFnReturnType>[];
}

export interface MapLayerObject<TemplateFnReturnType> {
  label: TemplateFnReturnType;
  dsoActiveChange?: (e: CustomEvent<MapLayerObjectActiveChangeEvent>) => void;
  dsoMouseEnter?: (e: CustomEvent<MouseEvent>) => void;
  dsoMouseLeave?: (e: CustomEvent<MouseEvent>) => void;
  symboolCode?: string;
  active?: boolean;
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

export interface MapLayerObjectActiveChangeEvent {
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
