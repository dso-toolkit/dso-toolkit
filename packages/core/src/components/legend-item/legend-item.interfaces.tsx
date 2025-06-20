export interface LegendItemActiveChangeEvent {
  /**
   * De huidige status van de Legend Item.
   */
  current: boolean;

  /**
   * De gewenste status van de Legend Item.
   */
  next: boolean;

  originalEvent: Event;
}
