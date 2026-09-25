import { Link } from "../link/link.models.js";

export enum LinkListType {
  Ul = "ul",
  Ol = "ol",
}

export interface LinkList {
  navLabel?: string;
  type?: LinkListType;
  links: Link[];
}
