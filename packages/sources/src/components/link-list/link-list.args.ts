import { ArgTypes } from '../../stories-helpers';

import { LinkList, LinkListType } from './link-list.models';
import { links } from './link-list.content';

export interface LinkListArgs {
  type?: LinkListType;
}

export const linkListArgTypes: ArgTypes<LinkListArgs> = {
  type: {
    options: [LinkListType.Ul, LinkListType.Ol],
    control: {
      type: 'select'
    }
  }
};

export function linkListArgsMapper(a: LinkListArgs): LinkList {
  return {
    links,
    type: a.type
  };
}
