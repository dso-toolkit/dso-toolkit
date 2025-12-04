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
