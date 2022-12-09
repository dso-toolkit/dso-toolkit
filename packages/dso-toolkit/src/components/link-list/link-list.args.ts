import { ArgTypes } from "../../storybook/index.js";

import { LinkList, LinkListType } from "./link-list.models.js";
import { Anchor } from "../anchor/anchor.models.js";

export interface LinkListArgs {
  navLabel: string;
  type: LinkListType;
  links: Anchor[];
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
