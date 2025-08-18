import { ArgTypes } from "storybook/internal/types";

import { List, ListItem, Type } from "./list.models.js";

export interface ListArgs {
  items: ListItem[];
  type?: Type;
  modifier?: string;
  spaced?: boolean;
}

export const listArgTypes: ArgTypes<ListArgs> = {
  items: {
    control: {
      disable: true,
    },
  },
  type: {
    options: [Type.Ul, Type.Ol],
    control: {
      type: "select",
    },
  },
  modifier: {
    options: [undefined, "group", "columns", "img-list", "ordered-action"],
    control: {
      type: "select",
    },
  },
  spaced: {
    control: {
      type: "boolean",
    },
  },
};

export function listArgsMapper(a: ListArgs): List {
  return {
    items: a.items,
    type: a.type,
    modifier: a.modifier,
    spaced: a.spaced,
  };
}
