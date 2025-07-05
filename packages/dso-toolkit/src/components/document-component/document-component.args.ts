import escapeStringRegexp from "escape-string-regexp";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { isOdd } from "../../storybook";
import { OzonContentUrlResolver } from "../ozon-content/ozon-content.models.js";

import {
  DocumentComponent,
  DocumentComponentAnnotationsWijzigactie,
  DocumentComponentHeading,
  DocumentComponentMode,
  DocumentComponentType,
  DocumentComponentWijzigactie,
} from "./document-component.models.js";

export interface DocumentComponentArgs {
  alternativeTitle?: string;
  annotated: boolean;
  bevatOntwerpInformatie: boolean;
  dsoAnnotationToggle: HandlerFunction;
  dsoToggle: HandlerFunction;
  dsoMarkItemHighlight: HandlerFunction;
  filtered: boolean;
  genesteOntwerpInformatie: boolean;
  gereserveerd: boolean;
  heading: DocumentComponentHeading;
  inhoud?: string;
  kop: string;
  notApplicable: boolean;
  open: boolean;
  openAnnotation: boolean;
  type: DocumentComponentType;
  vervallen: boolean;
  wijzigactie: DocumentComponentWijzigactie | undefined;
  annotationsWijzigactie: DocumentComponentAnnotationsWijzigactie | undefined;
  mark?: string;
  enableRecursiveToggle?: boolean;
  mode: DocumentComponentMode;
  dsoTableOfContentsClick: HandlerFunction;
  ozonContentUrlResolver?: OzonContentUrlResolver;
}

export const documentComponentArgs: Omit<
  DocumentComponentArgs,
  "dsoAnnotationToggle" | "dsoToggle" | "dsoMarkItemHighlight" | "dsoTableOfContentsClick"
> = {
  annotated: true,
  bevatOntwerpInformatie: true,
  filtered: true,
  genesteOntwerpInformatie: false,
  gereserveerd: false,
  heading: "h2",
  inhoud:
    "<Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Al>De artikelen 3.28, derde lid, en 3.38, aanhef en onder b, zijn van overeenkomstige toepassing op een activiteit als bedoeld in die artikelonderdelen die wordt verricht op een locatie waarvoor een op grond van artikel 4.35, eerste lid, van de Invoeringswet Omgevingswet als instructie geldende aanwijzing als beschermd stads- of dorpsgezicht als bedoeld in artikel 35, eerste lid, van de Monumentenwet 1988 zoals die wet luidde voor de inwerkingtreding van de Erfgoedwet van kracht is, zolang in dit omgevingsplan aan die locatie nog niet de functie-aanduiding rijksbeschermd stads- of dorpsgezicht is gegeven.</Al></Inhoud>",
  notApplicable: false,
  open: false,
  openAnnotation: false,
  type: "ARTIKEL",
  vervallen: false,
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
  bevatOntwerpInformatie: {
    control: {
      type: "boolean",
    },
  },
  dsoAnnotationToggle: {
    action: "dsoAnnotationToggle",
  },
  dsoToggle: {
    action: "dsoToggle",
  },
  dsoMarkItemHighlight: {
    action: "dsoMarkItemHighlight",
  },
  dsoTableOfContentsClick: {
    action: "dsoTableOfContentsClick",
  },
  filtered: {
    control: {
      type: "boolean",
    },
  },
  genesteOntwerpInformatie: {
    control: {
      type: "boolean",
    },
  },
  gereserveerd: {
    control: {
      type: "boolean",
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
  vervallen: {
    control: {
      type: "boolean",
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
  mark: {
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
  const { mark } = a;

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
    children: a.open || a.openAnnotation ? children : undefined,
    mark: mark
      ? (text) =>
          text
            .split(new RegExp(`(${escapeStringRegexp(mark)})`, "gi"))
            .map((item, index) =>
              isOdd(index) ? { text: item, highlight: !highlighted && (highlighted = true) } : item,
            )
      : undefined,
  };
}
