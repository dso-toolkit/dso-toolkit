import { ArgTypes, noControl } from '../../storybook';
import { Table, TableContent } from './table.models';

export interface TableArgs {
  noModal: boolean;
  content: TableContent;
}

export const tableArgTypes: ArgTypes<TableArgs> = {
  noModal: {
    control: {
      type: 'boolean'
    }
  },
  content: {
    ...noControl,
  }
};

export function tableArgsMapper(a: TableArgs): Required<Table> {
  return { ...a };
}
