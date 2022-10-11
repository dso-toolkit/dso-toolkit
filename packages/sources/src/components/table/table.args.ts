import { ArgTypes, noControl } from '../../storybook';
import { Table, TableContent } from './table.models';

export interface TableArgs {
  responsive: boolean;
  modal: boolean;
  content: TableContent;
}

export const tableArgTypes: ArgTypes<TableArgs> = {
  responsive: {
    control: {
      type: 'boolean'
    }
  },
  modal: {
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
