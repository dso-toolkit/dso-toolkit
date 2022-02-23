import { ArgTypes } from '../../stories-helpers';

import { ListItem, Lists, ListType } from './lists.models';

export interface ListsArgs {
  items: ListItem[];
  type?: ListType;
  modifier?: string;
}

export const listsArgTypes: ArgTypes<ListsArgs> = {
  items: {
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
    items: a.items,
    type: a.type,
    modifier: a.modifier
  };
}
