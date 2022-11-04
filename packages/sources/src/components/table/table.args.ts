import { ArgTypes, noControl } from "../../storybook";
import { Table, TableContent } from "./table.models";

export interface TableArgs<TemplateFnReturnType> {
  noModal: boolean;
  content: TableContent<TemplateFnReturnType>;
  headingColumns: boolean;
}

export const tableArgTypes: ArgTypes<TableArgs<never>> = {
  noModal: {
    control: {
      type: "boolean",
    },
  },
  content: {
    ...noControl,
  },
  headingColumns: {
    control: {
      type: "boolean",
    },
  },
};

export function tableArgsMapper<TemplateFnReturnType>(
  a: TableArgs<TemplateFnReturnType>
): Required<Table<TemplateFnReturnType>> {
  return { ...a };
}
