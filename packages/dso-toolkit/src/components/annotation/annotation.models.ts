export type Annotation =
  | AnnotationActiviteit
  | AnnotationGebiedsaanwijzing
  | AnnotationOmgevingsnorm
  | AnnotationWerkingsgebied;

/**
 * Basis model voor de verschillende annotaties.
 */
interface AnnotationBase {
  /**
   * Een symboolcode voor de verbeelding van de legenda.
   */
  symboolCode: string;

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
  naam: AnnotationDiff | string;

  /**
   * De activiteit regel kwalificatie.
   */
  regelKwalificatie: AnnotationDiff | string;

  /**
   * De noemer van de locaties.
   */
  locatieNoemers: Array<AnnotationDiff | string>;

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
  naam: AnnotationDiff | string;
}

export interface AnnotationOmgevingsnorm extends AnnotationBase {
  type: "omgevingsnorm";

  /**
   * De naam van de omgevingsnorm
   */
  naam: AnnotationDiff | string;

  /**
   * De waardes van de omgevingsnorm.
   */
  waardes: Array<AnnotationDiff | string>;

  /**
   * De eenheid van de omgevingsnorm.
   */
  eenheid: AnnotationDiff | string;
}

export interface AnnotationWerkingsgebied extends AnnotationBase {
  type: "werkingsgebied";

  /**
   * De noemer van de locatie.
   */
  locatieNoemer: AnnotationDiff | string;
}

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

  /**
   * Het originele event dat de status wijziging veroorzaakte.
   */
  originalEvent: Event;
}

export type AnnotationDiff = { toegevoegd: string } | { was: string; wordt: string } | { verwijderd: string };
