import { ArgTypes } from '../../storybook';
import { Table } from './table.models';

export interface TableArgs {
  responsive: boolean;
}

export const tableArgTypes: ArgTypes<TableArgs> = {
  responsive: {
    control: {
      type: 'boolean'
    }
  },
};

export function tableArgsMapper(a: TableArgs): Required<Table> {
  return { ...a };
}
