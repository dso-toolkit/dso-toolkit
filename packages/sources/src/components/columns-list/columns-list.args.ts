import { ArgTypes } from '../../stories-helpers';

import { ColumnsList, ColumnsListItem } from './columns-list.models';

export interface ColumnsListArgs {
  listItems: ColumnsListItem[];
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
