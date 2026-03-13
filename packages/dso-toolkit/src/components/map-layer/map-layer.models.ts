export interface MapLayer<TemplateFnReturnType> {
  active?: boolean;
  activatable?: boolean;
  dsoActiveChange?: (e: CustomEvent<MapLayerActiveChangeEvent>) => void;
  nameSlot: TemplateFnReturnType;
  objects: MapLayerObject<TemplateFnReturnType>[];
  wijzigactie?: string;
  labelSlot?: TemplateFnReturnType;
}

export interface MapLayerObject<TemplateFnReturnType> {
  label: TemplateFnReturnType;
  dsoActiveChange?: (e: CustomEvent<MapLayerObjectActiveChangeEvent>) => void;
  dsoMouseEnter?: (e: CustomEvent<MouseEvent>) => void;
  dsoMouseLeave?: (e: CustomEvent<MouseEvent>) => void;
  symboolCode?: string;
  active?: boolean;
  wijzigactie?: string;
  badge?: TemplateFnReturnType;
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
