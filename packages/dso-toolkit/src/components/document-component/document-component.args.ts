import escapeStringRegexp from "escape-string-regexp";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction, isOdd } from "../../storybook";
import { BadgeStatus } from "../badge/badge.models.js";
import { LabelStatus } from "../label/label.models.js";
import { OzonContentBegripResolver, OzonContentUrlResolver } from "../ozon-content/ozon-content.models.js";

import {
  DocumentComponent,
  DocumentComponentAnnotationsWijzigactie,
  DocumentComponentHeading,
  DocumentComponentInputType,
  DocumentComponentMode,
  DocumentComponentType,
  DocumentComponentWijzigactie,
} from "./document-component.models.js";

const BADGE_STATUS_OPTIONS: (BadgeStatus | undefined)[] = [
  undefined,
  "primary",
  "success",
  "info",
  "warning",
  "error",
  "outline",
  "attention",
];

const LABEL_STATUS_OPTIONS: (LabelStatus | undefined)[] = [
  undefined,
  "primary",
  "success",
  "info",
  "warning",
  "error",
  "bright",
  "attention",
  "filter",
  "toegevoegd",
  "verwijderd",
];

export interface DocumentComponentArgs {
  alternativeTitle?: string;
  annotated: boolean;
  badge?: string;
  badgeStatus?: BadgeStatus;
  badgeTooltip?: string;
  dsoAnnotationToggle: HandlerFunction;
  dsoToggle: HandlerFunction;
  dsoMarkItemHighlight: HandlerFunction;
  filtered: boolean;
  gereserveerd: DocumentComponentInputType;
  label?: string;
  labelStatus?: LabelStatus;
  heading: DocumentComponentHeading;
  inhoud?: string;
  kop: string;
  notApplicable: boolean;
  open: boolean;
  openAnnotation: boolean;
  type: DocumentComponentType;
  vervallen: DocumentComponentInputType;
  wijzigactie: DocumentComponentWijzigactie | undefined;
  annotationsWijzigactie: DocumentComponentAnnotationsWijzigactie | undefined;
  searchTerm?: string;
  enableRecursiveToggle?: boolean;
  mode: DocumentComponentMode;
  dsoOzonContentClick: HandlerFunction;
  dsoTableOfContentsClick: HandlerFunction;
  ozonContentUrlResolver?: OzonContentUrlResolver;
  ozonContentBegripResolver?: OzonContentBegripResolver;
}

export const documentComponentArgs: Omit<
  DocumentComponentArgs,
  "dsoAnnotationToggle" | "dsoToggle" | "dsoMarkItemHighlight" | "dsoTableOfContentsClick" | "dsoOzonContentClick"
> = {
  annotated: true,
  badge: undefined,
  badgeStatus: undefined,
  badgeTooltip: undefined,
  filtered: true,
  gereserveerd: "",
  label: "Ontwerp",
  labelStatus: "warning",
  heading: "h2",
  inhoud:
    "<Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Al>De artikelen 3.28, derde lid, en 3.38, aanhef en onder b, zijn van overeenkomstige toepassing op een activiteit als bedoeld in die artikelonderdelen die wordt verricht op een locatie waarvoor een op grond van artikel 4.35, eerste lid, van de Invoeringswet Omgevingswet als instructie geldende aanwijzing als beschermd stads- of dorpsgezicht als bedoeld in artikel 35, eerste lid, van de Monumentenwet 1988 zoals die wet luidde voor de inwerkingtreding van de Erfgoedwet van kracht is, zolang in dit omgevingsplan aan die locatie nog niet de functie-aanduiding rijksbeschermd stads- of dorpsgezicht is gegeven.</Al></Inhoud>",
  notApplicable: false,
  open: false,
  openAnnotation: false,
  type: "ARTIKEL",
  vervallen: "",
  wijzigactie: "voegtoe",
  annotationsWijzigactie: "voegtoe",
  mode: "document",
  kop: "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Kop xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Label>Artikel</Label><Nummer>13.12c</Nummer><Opschrift>NootInKop III <Noot type='voet' id='N8'><NootNummer>8</NootNummer><Al>Thomas en Eric test 3.</Al></Noot>Opschrift</Opschrift></Kop>",
};

export const documentComponentArgTypes: ArgTypes<DocumentComponentArgs> = {
  alternativeTitle: {
    control: {
      type: "text",
    },
  },
  annotated: {
    control: {
      type: "boolean",
    },
    if: { arg: "mode", eq: "document" },
  },
  badge: {
    control: {
      type: "text",
    },
  },
  badgeStatus: {
    options: BADGE_STATUS_OPTIONS,
    control: {
      type: "select",
    },
  },
  badgeTooltip: {
    control: {
      type: "text",
    },
  },
  dsoAnnotationToggle: argTypeAction(),
  dsoToggle: argTypeAction(),
  dsoMarkItemHighlight: argTypeAction(),
  dsoOzonContentClick: argTypeAction(),
  dsoTableOfContentsClick: argTypeAction(),
  filtered: {
    control: {
      type: "boolean",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  labelStatus: {
    options: LABEL_STATUS_OPTIONS,
    control: {
      type: "select",
    },
  },
  gereserveerd: {
    options: [
      undefined,
      "<Gereserveerd></Gereserveerd>",
      "<Gereserveerd wijzigactie='verwijder'></Gereserveerd>",
      "<Gereserveerd wijzigactie='voegtoe'></Gereserveerd>",
    ],
    control: {
      type: "select",
    },
  },
  vervallen: {
    options: [
      undefined,
      "<Vervallen></Vervallen>",
      "<Vervallen wijzigactie='verwijder'></Vervallen>",
      "<Vervallen wijzigactie='voegtoe'></Vervallen>",
    ],
    control: {
      type: "select",
    },
  },
  heading: {
    options: ["h2", "h3", "h4", "h5", "h6"],
    control: {
      type: "select",
    },
  },
  inhoud: {
    control: {
      type: "text",
    },
    if: { arg: "mode", eq: "document" },
  },
  kop: {
    control: {
      type: "text",
    },
  },
  notApplicable: {
    control: {
      type: "boolean",
    },
  },
  open: {
    control: {
      type: "boolean",
    },
    if: { arg: "mode", eq: "document" },
  },
  openAnnotation: {
    control: {
      type: "boolean",
    },
    if: { arg: "mode", eq: "document" },
  },
  type: {
    options: ["LICHAAM", "HOOFDSTUK", "AFDELING", "ARTIKEL", "LID", "PARAGRAAF", "SUBPARAGRAAF", "SUBSUBPARAGRAAF"],
    control: {
      type: "select",
    },
  },
  wijzigactie: {
    options: [undefined, "voegtoe", "verwijder", "nieuweContainer", "verwijderContainer"],
    control: {
      type: "select",
    },
  },
  annotationsWijzigactie: {
    options: [undefined, "voegtoe", "verwijder"],
    control: {
      type: "select",
    },
  },
  searchTerm: {
    control: {
      type: "text",
    },
    if: { arg: "mode", eq: "document" },
  },
  enableRecursiveToggle: {
    control: {
      type: "boolean",
    },
    if: { arg: "mode", eq: "document" },
  },
  mode: {
    options: ["document", "table-of-contents"],
    control: {
      type: "select",
    },
  },
};

export function documentComponentMapper<TemplateFnReturnType>(
  a: DocumentComponentArgs,
  children?: TemplateFnReturnType,
): DocumentComponent<TemplateFnReturnType> {
  const { searchTerm } = a;
  let highlighted = false;

  return {
    ...a,
    href: a.mode === "table-of-contents" ? "/document/id" : undefined,
    dsoTableOfContentsClick: (e) => {
      if (!e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
      }

      a.dsoTableOfContentsClick(e.detail);
    },
    dsoOzonContentClick: (e) => {
      if (!e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
      }

      a.dsoOzonContentClick(e.detail);
    },
    dsoToggle: (e) => a.dsoToggle(e.detail),
    children: a.open || a.openAnnotation ? children : undefined,
    mark: searchTerm
      ? (text) =>
          text
            .split(new RegExp(`(${escapeStringRegexp(searchTerm)})`, "gi"))
            .map((item, index) =>
              isOdd(index) ? { text: item, highlight: !highlighted && (highlighted = true) } : item,
            )
      : undefined,
  };
}
