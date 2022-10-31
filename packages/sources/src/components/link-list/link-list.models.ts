import { Anchor } from "../anchor/anchor.models";

export enum LinkListType {
  Ul = "ul",
  Ol = "ol",
}

export interface LinkList {
  navLabel?: string;
  type?: LinkListType;
  links: Anchor[];
}
