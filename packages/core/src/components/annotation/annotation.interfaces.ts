export type AnnotationWijzigactie = "voegtoe" | "verwijder";

export interface AnnotationActiveChangeEvent {
  /**
   * De huidige status van de annotatie.
   */
  current: boolean;

  /**
   * De gewenste status van de annotatie.
   */
  next: boolean;

  originalEvent: Event;
}
