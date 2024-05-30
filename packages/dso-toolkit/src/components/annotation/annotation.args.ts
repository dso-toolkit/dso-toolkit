import { ArgTypes } from "@storybook/types";

import { Annotation, AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "./annotation.models.js";

/**
 * Annotation Base
 */

interface AnnotationArgsBase {
  symboolCode: string;
  wijzigactie: AnnotationWijzigactie | undefined;
  active?: boolean;
  gewijzigdeLocatie?: boolean;
  dsoActiveChange(event: AnnotationActiveChangeEvent): void;
}

const annotationBaseArgs: Omit<AnnotationArgsBase, "dsoActiveChange"> = {
  symboolCode: "vszt030",
  wijzigactie: undefined,
  active: true,
  gewijzigdeLocatie: true,
};

const annotationArgTypesBase: ArgTypes<AnnotationArgsBase> = {
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

export interface AnnotationActiviteitArgs extends AnnotationArgsBase {
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

export interface AnnotationGebiedsaanwijzingArgs extends AnnotationArgsBase {
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

export interface AnnotationOmgevingsnormArgs extends AnnotationArgsBase {
  naam: AnnotationDiff | string;
  waardes: Array<AnnotationDiff | string>;
  eenheid: AnnotationDiff | string;
}

export const annotationOmgevingsnormArgs: Omit<AnnotationOmgevingsnormArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  naam: "Geluid",
  waardes: [{ verwijderd: "50", toegevoegd: "45" }, "55"],
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

export interface AnnotationWerkingsgebiedArgs extends AnnotationArgsBase {
  locatieNoemers: Array<AnnotationDiff | string>;
}

export const annotationWerkingsgebiedArgs: Omit<AnnotationWerkingsgebiedArgs, "dsoActiveChange"> = {
  ...annotationBaseArgs,
  locatieNoemers: [
    { verwijderd: "bedrijven categorie A" },
    "winkelgebied",
    { toegevoegd: "woonwijk" },
    { was: "poldergebied", wordt: "tuingebied" },
  ],
};

export const annotationWerkingsgebiedArgTypes: ArgTypes<AnnotationWerkingsgebiedArgs> = {
  ...annotationArgTypesBase,
  locatieNoemers: {
    control: {
      type: "select",
    },
  },
};

export function annotationWerkingsgebiedArgsMapper(a: AnnotationWerkingsgebiedArgs): Annotation {
  return {
    type: "werkingsgebied",
    ...a,
  };
}
