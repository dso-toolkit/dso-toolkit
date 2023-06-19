import { ArgTypes } from "@storybook/types";

import { Footnote } from "./footnotes.models.js";

export interface FootnotesReferenceArgs {
  number: number;
  label: string;
}

export const footnotesReferenceArgTypes: ArgTypes<FootnotesReferenceArgs> = {
  number: {
    control: {
      type: "number",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
};

export function footnotesReferenceArgsMapper(a: FootnotesReferenceArgs): Footnote {
  return {
    label: a.label,
    number: a.number,
  };
}

export interface FootnotesListArgs {
  footnotes: Footnote[];
}

export const footnotesListArgTypes: ArgTypes<FootnotesListArgs> = {
  footnotes: {
    control: {
      disable: true,
    },
  },
};

export function footnotesListArgsMapper(a: FootnotesListArgs): Footnote[] {
  return a.footnotes;
}

export interface FootnotesExampleArgs {
  footnote14: Footnote;
  footnote15: Footnote;
  footnotes: Footnote[];
}

export const footnotesExampleArgTypes: ArgTypes<FootnotesExampleArgs> = {
  footnote14: {
    control: {
      disable: true,
    },
  },
  footnote15: {
    control: {
      disable: true,
    },
  },
  footnotes: {
    control: {
      disable: true,
    },
  },
};
