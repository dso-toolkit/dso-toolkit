import { ArgTypes } from '../../stories-helpers';

import { ColumnsList } from './columns-list.models';

export interface ColumnsListArgs {
  listItems: string[];
}

export const columnsListArgTypes: ArgTypes<ColumnsListArgs> = {
  listItems: {
    control: {
      disable: true
    }
  },
};

export function columnsListArgsMapper(a: ColumnsListArgs): ColumnsList {
  return {
    listItems: a.listItems
  };
}
