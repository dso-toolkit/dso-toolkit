import { ArgTypes } from "@storybook/types";

import { LinkList, LinkListType } from "./link-list.models.js";
import { Link } from "../link/link.models.js";

export interface LinkListArgs {
  navLabel: string;
  type: LinkListType;
  links: Link[];
}

export const linkListArgTypes: ArgTypes<LinkListArgs> = {
  navLabel: {
    control: {
      type: "string",
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
