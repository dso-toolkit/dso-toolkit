import { Anchor } from '../anchor/anchor.models';

export enum LinkListType {
  Ul = 'ul',
  Ol = 'ol'
}

export interface LinkList {
  type?: LinkListType;
  links: Anchor[];
}
