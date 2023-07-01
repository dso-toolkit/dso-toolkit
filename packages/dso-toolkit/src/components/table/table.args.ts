import { ArgTypes } from "@storybook/types";
import { Table, TableContent } from "./table.models.js";

export interface TableArgs {
  noModal: boolean;
  headingColumns: boolean;
  verticalLines: boolean;
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
};

export function tableArgsMapper<TemplateFnReturnType>(
  a: TableArgs,
  content: TableContent<TemplateFnReturnType>
): Table<TemplateFnReturnType> {
  return { ...a, content };
}
