import { ArgTypes } from "storybook/internal/types";

import { Link } from "../link/link.models.js";

import { LinkList, LinkListType } from "./link-list.models.js";

export interface LinkListArgs {
  navLabel: string;
  type: LinkListType;
  links: Link[];
}

export const linkListArgTypes: ArgTypes<LinkListArgs> = {
  navLabel: {
    control: {
      type: "text",
    },
  },
  type: {
    options: [LinkListType.Ul, LinkListType.Ol],
    control: {
      type: "select",
    },
  },
  links: {
    control: {
      disable: true,
    },
  },
};

export function linkListArgsMapper(a: LinkListArgs): LinkList {
  return {
    ...a,
  };
}
