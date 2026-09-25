import { TemplateResult } from "lit-html";

export interface MapLayer {
  active?: boolean;
  activatable?: boolean;
  dsoActiveChange?: (e: CustomEvent<MapLayerActiveChangeEvent>) => void;
  nameSlot: TemplateResult | string;
  objects: MapLayerObject[];
  wijzigactie?: string;
  labelSlot?: TemplateResult | string;
}

export interface MapLayerObject {
  name: TemplateResult | string;
  dsoActiveChange?: (e: CustomEvent<MapLayerObjectActiveChangeEvent>) => void;
  dsoMouseEnter?: (e: CustomEvent<MouseEvent>) => void;
  dsoMouseLeave?: (e: CustomEvent<MouseEvent>) => void;
  symboolCode?: string;
  active?: boolean;
  wijzigactie?: string;
  labelSlot?: TemplateResult | string;
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
