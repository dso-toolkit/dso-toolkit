import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { Table, TableContent } from "./table.models.js";

export interface TableArgs {
  noModal: boolean;
  headingColumns: boolean;
  verticalLines: boolean;
  role?: string;
}

export const tableArgTypes: ArgTypes<TableArgs> = {
  noModal: {
    control: {
      type: "boolean",
    },
  },
  headingColumns: {
    control: {
      type: "boolean",
    },
  },
  verticalLines: {
    control: {
      type: "boolean",
    },
  },
  role: {
    ...noControl,
  },
};

export function tableArgsMapper<TemplateFnReturnType>(
  a: TableArgs,
  content: TableContent<TemplateFnReturnType>,
): Table<TemplateFnReturnType> {
  return { ...a, content };
}
