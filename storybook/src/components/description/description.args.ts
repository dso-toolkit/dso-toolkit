import { ArgTypes } from "storybook/internal/types";

import { Description } from "./description.models.js";

export interface DescriptionArgs {
  id: string;
  term: string;
  content: string;
  open: boolean;
}

export const descriptionArgTypes: ArgTypes<DescriptionArgs> = {
  term: {
    control: {
      type: "text",
      required: true,
    },
  },
  content: {
    control: {
      type: "text",
      required: true,
    },
  },
  id: {
    control: {
      type: "text",
      required: true,
    },
  },
  open: {
    control: {
      type: "boolean",
    },
  },
};

export function descriptionArgsMapper(a: DescriptionArgs): Description {
  return {
    content: a.content,
    id: a.id,
    open: a.open,
    term: a.term,
  };
}

export interface DescriptionExampleArgs {
  openTerm: boolean;
}

export const descriptionExampleArgTypes: ArgTypes<DescriptionExampleArgs> = {
  openTerm: {
    control: {
      type: "boolean",
    },
  },
};
