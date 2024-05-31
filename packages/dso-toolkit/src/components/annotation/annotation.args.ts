import { ArgTypes } from "@storybook/types";

import { Annotation, AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "./annotation.models.js";

/**
 * Annotation Base
 */

interface AnnotationBaseArgs {
  symboolCode: string;
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
    options: ["vszt030", "vag000"],
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
  naam: AnnotationDiff | string;
  regelKwalificatie: AnnotationDiff | string;
  locatieNoemers: Array<AnnotationDiff | string>;
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
      type: "array",
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
  naam: AnnotationDiff | string;
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
 * Omgevingsnorm
 */

export interface AnnotationOmgevingsnormArgs extends AnnotationBaseArgs {
  naam: AnnotationDiff | string;
  waardes: Array<AnnotationDiff | string>;
  eenheid: AnnotationDiff | string;
}

export const annotationOmgevingsnormArgs: Omit<AnnotationOmgevingsnormArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  naam: "Geluid",
  waardes: [{ was: "50 dB", wordt: "45 dB" }, "55 dB"],
  eenheid: "dB",
};

export const annotationOmgevingsnormArgTypes: ArgTypes<AnnotationOmgevingsnormArgs> = {
  ...annotationArgTypesBase,
  naam: {
    control: {
      type: "text",
    },
  },
  waardes: {
    control: {
      type: "array",
    },
  },
  eenheid: {
    control: {
      type: "text",
    },
  },
};

export function annotationOmgevingsnormArgsMapper(a: AnnotationOmgevingsnormArgs): Annotation {
  return {
    type: "omgevingsnorm",
    ...a,
  };
}

/**
 * Werkingsgebied
 */

export interface AnnotationWerkingsgebiedArgs extends AnnotationBaseArgs {
  locatieNoemer: AnnotationDiff | string;
}

export const annotationWerkingsgebiedArgs: Omit<AnnotationWerkingsgebiedArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  locatieNoemer: "Winkelgebied",
};

export const annotationWerkingsgebiedArgTypes: ArgTypes<AnnotationWerkingsgebiedArgs> = {
  ...annotationArgTypesBase,
  locatieNoemer: {
    control: {
      type: "text",
    },
  },
};

export function annotationWerkingsgebiedArgsMapper(a: AnnotationWerkingsgebiedArgs): Annotation {
  return {
    type: "werkingsgebied",
    ...a,
  };
}
