export type AnnotationWijzigactie = "voegtoe" | "verwijderd";

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

export type AnnotationDiff = { toegevoegd: string } | { was: string; wordt: string } | { verwijderd: string };
