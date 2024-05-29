import { ArgTypes } from "@storybook/types";

import { Annotation, AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "./annotation.models.js";

export interface AnnotationActiviteitArgs {
  symboolCode: string;
  wijzigactie: AnnotationWijzigactie | undefined;
  active?: boolean;
  gewijzigdeLocatie?: boolean;
  dsoActiveChange(event: AnnotationActiveChangeEvent): void;
  naam: AnnotationDiff | string;
  regelKwalificatie: AnnotationDiff | string;
  locatieNoemers: Array<AnnotationDiff | string>;
  regelKwalificatieVoorzetsel: string | undefined;
}

export const annotationActiviteitArgs: Omit<AnnotationActiviteitArgs, "dsoActiveChange"> = {
  symboolCode: "vszt030",
  active: true,
  gewijzigdeLocatie: true,
  wijzigactie: undefined,
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

export function annotationActiviteitArgsMapper({
  dsoActiveChange,
  locatieNoemers,
  naam,
  regelKwalificatie,
  symboolCode,
  active,
  gewijzigdeLocatie,
  regelKwalificatieVoorzetsel,
  wijzigactie,
}: AnnotationActiviteitArgs): Annotation {
  return {
    type: "activiteit",
    symboolCode,
    naam,
    regelKwalificatie,
    locatieNoemers,
    regelKwalificatieVoorzetsel,
    active,
    dsoActiveChange,
    gewijzigdeLocatie,
    wijzigactie,
  };
}

export interface AnnotationGebiedsaanwijzingArgs {}

export const annotationGebiedsaanwijzingArgs: AnnotationGebiedsaanwijzingArgs = {};

export function annotationGebiedsaanwijzingArgsMapper({}: AnnotationGebiedsaanwijzingArgs): Annotation {
  throw new Error("Not implemented");
}

export interface AnnotationOmgevingsnormArgs {}

export const annotationOmgevingsnormArgs: AnnotationOmgevingsnormArgs = {};

export function annotationOmgevingsnormArgsMapper({}: AnnotationOmgevingsnormArgs): Annotation {
  throw new Error("Not implemented");
}

export interface AnnotationWerkingsgebiedArgs {}

export const annotationWerkingsgebiedArgs: AnnotationWerkingsgebiedArgs = {};

export function annotationWerkingsgebiedArgsMapper({}: AnnotationWerkingsgebiedArgs): Annotation {
  throw new Error("Not implemented");
}
