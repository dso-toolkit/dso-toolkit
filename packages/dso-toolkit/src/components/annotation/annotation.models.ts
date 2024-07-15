import { RenvooiValue } from "../renvooi";

export type Annotation =
  | AnnotationActiviteit
  | AnnotationGebiedsaanwijzing
  | AnnotationOmgevingsnormwaarde
  | AnnotationLocatie
  | AnnotationKaart;

/**
 * Basis model voor de verschillende annotaties.
 */
interface AnnotationBase {
  /**
   * Een symboolcode voor de verbeelding van de legenda.
   */
  symboolCode?: string;

  /**
   * Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is.
   */
  wijzigactie?: AnnotationWijzigactie;

  /**
   * Een optionele boolean die aangeeft of de annotatie actief is.
   */
  active?: boolean;

  /**
   * Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.
   */
  gewijzigdeLocatie?: boolean;

  /**
   * Een optionele event listener voor wijzigingen aan de status van de annotatie.
   */
  dsoActiveChange?(event: AnnotationActiveChangeEvent): void;
}

export interface AnnotationActiviteit extends AnnotationBase {
  type: "activiteit";

  /**
   * De naam van de activiteit.
   */
  naam: RenvooiValue | string;

  /**
   * De activiteit regel kwalificatie.
   */
  regelKwalificatie: RenvooiValue | string;

  /**
   * De noemer van de locaties.
   */
  locatieNoemers: Array<RenvooiValue | string>;

  /**
   * Voorzetsel van de regelKwalificatie. Exclusief dubbele punt.
   */
  regelKwalificatieVoorzetsel?: string;
}

export interface AnnotationGebiedsaanwijzing extends AnnotationBase {
  type: "gebiedsaanwijzing";

  /**
   * De naam van de gebiedsaanwijzing.
   */
  naam: RenvooiValue | string;
}

export interface AnnotationOmgevingsnormwaarde extends AnnotationBase {
  type: "omgevingsnormwaarde";

  /**
   * De naam van de omgevingsnorm of omgevingswaarde.
   */
  naam: RenvooiValue | string;

  /**
   * De toelichting van de waardes.
   */
  toelichting?: string;

  /**
   * De waardes van de omgevingsnorm of omgevingswaarde.
   */
  waardes: Array<RenvooiValue | string>;

  /**
   * De eenheid van de omgevingsnorm of omgevingswaarde.
   */
  eenheid: RenvooiValue | string;
}

export interface AnnotationLocatie extends AnnotationBase {
  type: "locatie";

  /**
   * De noemer van de locatie.
   */
  locatieNoemer: RenvooiValue | string;
}

export interface AnnotationKaart extends Pick<AnnotationBase, "wijzigactie"> {
  type: "kaart";

  /**
   * De naam van de kaart.
   */
  naam: RenvooiValue | string;

  /**
   * De url naar de kaart.
   */
  href: string;

  /**
   * Event als de gebruiker de kaartnaam selecteert.
   */
  dsoClick(event: AnnotationKaartClickEvent): void;
}

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

  /**
   * Het originele event dat de status wijziging veroorzaakte.
   */
  originalEvent: Event;
}

export interface AnnotationKaartClickEvent {
  /**
   * De url naar de kaart.
   */
  href: string;

  /**
   * Het originele event.
   */
  originalEvent: MouseEvent;

  /**
   * `true` als de gebruiker modifier keys (Ctrl, Shift, Alt, Meta) gebruikte bij het activeren.
   */
  isModifiedEvent: boolean;
}
