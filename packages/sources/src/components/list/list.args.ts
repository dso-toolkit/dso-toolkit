import { ArgTypes } from '../../stories-helpers';

import { List, Type } from './list.models';

export interface ListArgs {
  listItems: string[];
  type?: Type;
  modifier?: string;
}

export const listArgTypes: ArgTypes<ListArgs> = {
  listItems: {
    control: {
      disable: true
    }
  },
  type: {
    options: [Type.Ul, Type.Ol],
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

export function listArgsMapper(a: ListArgs): List {
  return {
    listItems: a.listItems,
    type: a.type,
    modifier: a.modifier
  };
}
