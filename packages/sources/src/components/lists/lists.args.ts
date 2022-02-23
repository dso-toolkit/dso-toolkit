import { ArgTypes } from '../../stories-helpers';

import { Lists, ListType } from './lists.models';

export interface ListsArgs {
  listItems: string[];
  type?: ListType;
  modifier?: string;
}

export const listsArgTypes: ArgTypes<ListsArgs> = {
  listItems: {
    control: {
      disable: true
    }
  },
  type: {
    options: [ListType.Ul, ListType.Ol],
    control: {
      type: 'select'
    }
  },
  modifier: {
    options: [undefined, 'group', 'columns'],
    control: {
      type: 'select'
    }
  }
};

export function listsArgsMapper(a: ListsArgs): Lists {
  return {
    listItems: a.listItems,
    type: a.type,
    modifier: a.modifier
  };
}
