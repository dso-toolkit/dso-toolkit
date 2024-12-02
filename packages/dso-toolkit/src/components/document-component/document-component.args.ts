import { ArgTypes } from "@storybook/types";

import {
  DocumentComponent,
  DocumentComponentHeading,
  DocumentComponentType,
  DocumentComponentWijzigactie,
  DocumentComponentAnnotationsWijzigactie,
} from "./document-component.models";
import { HandlerFunction } from "@storybook/addon-actions/*";
import escapeStringRegexp from "escape-string-regexp";

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
  label: string;
  notApplicable: boolean;
  nummer: string;
  open: boolean;
  openAnnotation: boolean;
  opschrift: string;
  type: DocumentComponentType;
  vervallen: boolean;
  wijzigactie: DocumentComponentWijzigactie | undefined;
  annotationsWijzigactie: DocumentComponentAnnotationsWijzigactie | undefined;
  mark?: string;
  enableRecursiveToggle?: boolean;
}

export const documentComponentArgs: Omit<
  DocumentComponentArgs,
  "dsoAnnotationToggle" | "dsoToggle" | "dsoMarkItemHighlight"
> = {
  annotated: true,
  bevatOntwerpInformatie: true,
  filtered: true,
  genesteOntwerpInformatie: false,
  gereserveerd: false,
  heading: "h2",
  inhoud:
    "<Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Al>De artikelen 3.28, derde lid, en 3.38, aanhef en onder b, zijn van overeenkomstige toepassing op een activiteit als bedoeld in die artikelonderdelen die wordt verricht op een locatie waarvoor een op grond van artikel 4.35, eerste lid, van de Invoeringswet Omgevingswet als instructie geldende aanwijzing als beschermd stads- of dorpsgezicht als bedoeld in artikel 35, eerste lid, van de Monumentenwet 1988 zoals die wet luidde voor de inwerkingtreding van de Erfgoedwet van kracht is, zolang in dit omgevingsplan aan die locatie nog niet de functie-aanduiding rijksbeschermd stads- of dorpsgezicht is gegeven.</Al></Inhoud>",
  label:
    "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Label xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'>Artikel</Label>",
  notApplicable: false,
  nummer:
    "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Nummer xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'>3.3</Nummer>",
  open: false,
  openAnnotation: false,
  opschrift:
    "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'>Overgangsrecht: rijksbeschermde stads- en dorpsgezichten</Opschrift>",
  type: "ARTIKEL",
  vervallen: false,
  wijzigactie: "voegtoe",
  annotationsWijzigactie: "voegtoe",
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
  },
  label: {
    control: {
      type: "text",
    },
  },
  notApplicable: {
    control: {
      type: "boolean",
    },
  },
  nummer: {
    control: {
      type: "text",
    },
  },
  open: {
    control: {
      type: "boolean",
    },
  },
  openAnnotation: {
    control: {
      type: "boolean",
    },
  },
  opschrift: {
    control: {
      type: "text",
    },
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
  },
  enableRecursiveToggle: {
    control: {
      type: "boolean",
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

function isOdd(n: number): boolean {
  return Math.abs(n % 2) === 1;
}
