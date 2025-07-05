import { ArgTypes } from "storybook/internal/types";

import { RenvooiValue } from "../renvooi/renvooi.models.js";

import {
  Annotation,
  AnnotationActiveChangeEvent,
  AnnotationKaartClickEvent,
  AnnotationWijzigactie,
} from "./annotation.models.js";

/**
 * Annotation Base
 */

interface AnnotationBaseArgs {
  symboolCode: string | undefined;
  wijzigactie: AnnotationWijzigactie | undefined;
  active?: boolean;
  gewijzigdeLocatie?: boolean;
  dsoActiveChange(event: AnnotationActiveChangeEvent): void;
}

const annotationBaseArgs: Omit<AnnotationBaseArgs, "dsoActiveChange"> = {
  symboolCode: "vszt030",
  wijzigactie: undefined,
  active: true,
  gewijzigdeLocatie: true,
};

const annotationArgTypesBase: ArgTypes<AnnotationBaseArgs> = {
  symboolCode: {
    options: ["vszt030", "vag000", undefined],
    control: {
      type: "select",
    },
  },
  wijzigactie: {
    options: [undefined, "voegtoe", "verwijder"],
    control: {
      type: "select",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  gewijzigdeLocatie: {
    control: {
      type: "boolean",
    },
  },
  dsoActiveChange: {
    action: "dsoActiveChange",
  },
};

/**
 * Activiteit
 */

export interface AnnotationActiviteitArgs extends AnnotationBaseArgs {
  naam: RenvooiValue | string;
  regelKwalificatie: RenvooiValue | string;
  locatieNoemers: Array<RenvooiValue | string>;
  regelKwalificatieVoorzetsel: string | undefined;
}

export const annotationActiviteitArgs: Omit<AnnotationActiviteitArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  naam: "Toegevoegde activiteit",
  regelKwalificatie: "toegestaan",
  regelKwalificatieVoorzetsel: "in",
  locatieNoemers: [
    { verwijderd: "bedrijven categorie A" },
    "winkelgebied",
    { toegevoegd: "woonwijk" },
    { was: "poldergebied", wordt: "tuingebied" },
  ],
};

export const annotationActiviteitArgTypes: ArgTypes<AnnotationActiviteitArgs> = {
  ...annotationArgTypesBase,
  naam: {
    control: {
      type: "text",
    },
  },
  regelKwalificatie: {
    control: {
      type: "text",
    },
  },
  regelKwalificatieVoorzetsel: {
    control: {
      type: "text",
    },
  },
  locatieNoemers: {
    control: {
      type: "object",
    },
  },
};

export function annotationActiviteitArgsMapper(a: AnnotationActiviteitArgs): Annotation {
  return {
    type: "activiteit",
    ...a,
  };
}

/**
 * Gebiedsaanwijzing
 */

export interface AnnotationGebiedsaanwijzingArgs extends AnnotationBaseArgs {
  naam: RenvooiValue | string;
}

export const annotationGebiedsaanwijzingArgs: Omit<AnnotationGebiedsaanwijzingArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  naam: "Winkelgebied",
};

export const annotationGebiedsaanwijzingArgTypes: ArgTypes<AnnotationGebiedsaanwijzingArgs> = {
  ...annotationArgTypesBase,
  naam: {
    control: {
      type: "text",
    },
  },
};

export function annotationGebiedsaanwijzingArgsMapper(a: AnnotationGebiedsaanwijzingArgs): Annotation {
  return {
    type: "gebiedsaanwijzing",
    ...a,
  };
}

/**
 * Omgevingsnorm en Omgevingswaarde
 */

export interface AnnotationOmgevingsnormwaardeArgs extends AnnotationBaseArgs {
  naam: RenvooiValue | string;
  toelichting: string;
  waardes: Array<RenvooiValue | string>;
  eenheid: RenvooiValue | string;
}

export const annotationOmgevingsnormwaardeArgs: Omit<AnnotationOmgevingsnormwaardeArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  naam: "Geluid",
  toelichting: "Waardes worden weergegeven op de kaart",
  waardes: [{ was: "50 dB", wordt: "45 dB" }, "55 dB"],
  eenheid: "dB",
};

export const annotationOmgevingsnormwaardeArgTypes: ArgTypes<AnnotationOmgevingsnormwaardeArgs> = {
  ...annotationArgTypesBase,
  naam: {
    control: {
      type: "text",
    },
  },
  toelichting: {
    control: {
      type: "text",
    },
  },
  waardes: {
    control: {
      type: "object",
    },
  },
  eenheid: {
    control: {
      type: "text",
    },
  },
};

export function annotationOmgevingsnormwaardeArgsMapper(a: AnnotationOmgevingsnormwaardeArgs): Annotation {
  return {
    type: "omgevingsnormwaarde",
    ...a,
  };
}

/**
 * Locatie
 */

export interface AnnotationLocatieArgs extends AnnotationBaseArgs {
  locatieNoemer: RenvooiValue | string;
}

export const annotationLocatieArgs: Omit<AnnotationLocatieArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  locatieNoemer: "Winkelgebied",
};

export const annotationLocatieArgTypes: ArgTypes<AnnotationLocatieArgs> = {
  ...annotationArgTypesBase,
  locatieNoemer: {
    control: {
      type: "text",
    },
  },
};

export function annotationLocatieArgsMapper(a: AnnotationLocatieArgs): Annotation {
  return {
    type: "locatie",
    ...a,
  };
}

/**
 * Kaart
 */

export interface AnnotationKaartArgs extends Pick<AnnotationBaseArgs, "wijzigactie"> {
  naam: RenvooiValue | string;
  href: string;
  dsoClick(event: AnnotationKaartClickEvent): void;
}

export const annotationKaartArgs: Omit<AnnotationKaartArgs, "dsoClick"> = {
  wijzigactie: annotationBaseArgs.wijzigactie,
  naam: "Kaartnaam",
  href: "#",
};

export const annotationKaartArgTypes: ArgTypes<AnnotationKaartArgs> = {
  wijzigactie: annotationArgTypesBase.wijzigactie,
  naam: {
    control: {
      type: "text",
    },
  },
  href: {
    control: {
      type: "text",
    },
  },
  dsoClick: {
    action: "dsoClick",
  },
};

export function annotationKaartArgsMapper(a: AnnotationKaartArgs): Annotation {
  return {
    type: "kaart",
    ...a,
  };
}
